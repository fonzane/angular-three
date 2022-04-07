import { DOCUMENT } from '@angular/common';
import {
    ElementRef,
    Inject,
    Injectable,
    NgZone,
    Optional,
    SkipSelf,
} from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';
import * as THREE from 'three';
import { NGT_PERFORMANCE_OPTIONS } from '../di/performance';
import { WINDOW } from '../di/window';
import { NgtResize, NgtResizeResult } from '../services/resize';
import type {
    NgtAnimationRecord,
    NgtCamera,
    NgtEvents,
    NgtGLOptions,
    NgtInternalState,
    NgtPerformanceOptions,
    NgtSize,
    NgtState,
    NgtUnknownInstance,
    NgtViewport,
    UnknownRecord,
} from '../types';
import { applyProps } from '../utils/apply-props';
import { createEvents } from '../utils/events';
import { prepare } from '../utils/instance';
import { makeDpr, makeId } from '../utils/make';
import { NgtComponentStore, tapEffect } from './component-store';

type NgtAnimationRecordWithUuid = NgtAnimationRecord & { uuid: string };

function isOrthographicCamera(
    def: THREE.Camera
): def is THREE.OrthographicCamera {
    return def && (def as THREE.OrthographicCamera).isOrthographicCamera;
}

const DOM_EVENTS = {
    click: false,
    contextmenu: false,
    dblclick: false,
    wheel: false, // passive wheel errors with OrbitControls
    pointerdown: true,
    pointerup: true,
    pointerleave: true,
    pointermove: true,
    pointercancel: true,
    lostpointercapture: true,
} as const;

@Injectable()
export class NgtStore extends NgtComponentStore<NgtState> {
    private readonly pointer = new THREE.Vector2();
    private readonly position = new THREE.Vector3();
    private readonly defaultTarget = new THREE.Vector3();
    private readonly tempTarget = new THREE.Vector3();

    readonly ready$ = this.select((s) => s.ready).pipe(
        filter((ready) => ready)
    );

    readonly camera$ = this.select((s) => s.camera);
    readonly scene$ = this.select((s) => s.scene);
    readonly gl$ = this.select((s) => s.gl);
    readonly raycaster$ = this.select((s) => s.raycaster);
    readonly active$ = this.select((s) => s.internal.active);

    private allConstructed$ = this.select(
        this.camera$,
        this.scene$,
        this.gl$,
        this.raycaster$,
        this.active$,
        (camera, scene, gl, raycaster, active) =>
            !!camera && !!gl && !!scene && !!raycaster && active === true
    ).pipe(map((ready) => ({ ready })));

    private performanceTimeoutId: ReturnType<typeof setTimeout> | undefined =
        undefined;

    private dimensions$ = this.select(
        this.select((s) => s.size),
        this.select((s) => s.viewport),
        (size, viewport) => ({ size, viewport })
    );

    constructor(
        {
            nativeElement: { clientWidth, clientHeight },
        }: ElementRef<HTMLElement>,
        @Inject(NGT_PERFORMANCE_OPTIONS)
        performanceOptions: NgtPerformanceOptions,
        @Inject(DOCUMENT) document: Document,
        @Inject(WINDOW) window: Window,
        @Optional() @SkipSelf() private previousStore: NgtStore,
        @Inject(NgtResize) private resizeResult$: Observable<NgtResizeResult>,
        private zone: NgZone
    ) {
        super();
        this.set({
            ready: false,
            clock: new THREE.Clock(),
            frameloop: 'always',
            legacy: false,
            linear: false,
            flat: false,
            orthographic: false,
            shadows: false,
            controls: null,
            pointer: this.pointer,
            mouse: this.pointer,
            events: {
                priority: 1,
                enabled: true,
                connected: undefined,
                handlers: {} as NgtEvents,
                compute: (event, state) => {
                    // https://github.com/pmndrs/react-three-fiber/pull/782
                    // Events trigger outside of canvas when moved, use offsetX/Y by default and allow overrides
                    state.pointer.set(
                        (event.offsetX / state.size.width) * 2 - 1,
                        -(event.offsetY / state.size.height) * 2 + 1
                    );
                    state.raycaster.setFromCamera(state.pointer, state.camera);
                },
            },
            cameraOptions: {},
            glOptions: {},
            raycasterOptions: {},
            sceneOptions: {},
            pointerMissed: () => {},
            internal: {
                active: false,
                lastEvent: null,
                priority: 0,
                frames: 0,
                interaction: [],
                hovered: new Map(),
                subscribers: [],
                initialClick: [0, 0],
                initialHits: [],
                capturedMap: new Map(),
                animations: new Map(),
            },
            dpr: [1, 2],
            size: {
                width: clientWidth,
                height: clientHeight,
            },
            viewport: {
                initialDpr: window.devicePixelRatio || 1,
                dpr: window.devicePixelRatio || 1,
                width: clientWidth,
                height: clientHeight,
                aspect: clientWidth / clientHeight,
                distance: 0,
                factor: 0,
                getCurrentViewport: (
                    camera = this.get((s) => s.camera),
                    target:
                        | THREE.Vector3
                        | Parameters<THREE.Vector3['set']> = this.defaultTarget,
                    size = this.get((s) => s.size)
                ) => {
                    const { width, height } = size;
                    const aspect = width / height;
                    if (target instanceof THREE.Vector3)
                        this.tempTarget.copy(target);
                    else this.tempTarget.set(...target);
                    const distance = camera
                        .getWorldPosition(this.position)
                        .distanceTo(this.tempTarget);
                    if (isOrthographicCamera(camera)) {
                        return {
                            width: width / camera.zoom,
                            height: height / camera.zoom,
                            factor: 1,
                            distance,
                            aspect,
                        };
                    }
                    const fov = (camera.fov * Math.PI) / 180; // convert vertical fov to radians
                    const h = 2 * Math.tan(fov / 2) * distance; // visible height
                    const w = h * (width / height);
                    return {
                        width: w,
                        height: h,
                        factor: width / w,
                        distance,
                        aspect,
                    };
                },
            },
            performance: {
                ...performanceOptions,
                regress: () => {
                    this.zone.runOutsideAngular(() => {
                        const performance = this.get((s) => s.performance);
                        // Clear timeout
                        if (this.performanceTimeoutId)
                            clearTimeout(this.performanceTimeoutId);
                        // Set lower bound performance
                        if (performance.current !== performance.min) {
                            this.set((state) => ({
                                performance: {
                                    ...state.performance,
                                    current: performance.min,
                                },
                            }));
                        }
                        // Go back to upper bound performance after a while unless something regresses meanwhile
                        this.performanceTimeoutId = setTimeout(
                            () =>
                                this.set((state) => ({
                                    performance: {
                                        ...state.performance,
                                        current: this.get(
                                            (s) => s.performance.max
                                        ),
                                    },
                                })),
                            performance.debounce
                        );
                    });
                },
            },
            previousState: previousStore?.get(),
        });
    }

    init(
        canvasElement: HTMLCanvasElement,
        invalidate: (state?: () => NgtState) => void,
        advance: (
            timestamp: number,
            state?: () => NgtState,
            frame?: THREE.XRFrame
        ) => void
    ) {
        this.initEvents(canvasElement);
        this.resize(this.resizeResult$);
        this.updateDimensions(this.dimensions$);
        this.initRenderer({ canvasElement, advance });
        this.updateSubscribers(
            this.select(
                this.select((s) => s.internal.animations),
                this.select((s) => s.internal.priority),
                (animations, priority) => ({ animations, priority })
            )
        );
        this.set((state) => ({
            invalidate: () => invalidate(() => this.get()),
            advance: (timestamp) => advance(timestamp, () => this.get()),
            internal: { ...state.internal, active: true },
        }));
        this.set(this.allConstructed$);
    }

    register(record: NgtAnimationRecord) {
        const uuid =
            record.obj instanceof THREE.Object3D
                ? record.obj.uuid
                : typeof record.obj === 'function'
                ? record.obj().uuid
                : makeId();
        this.registerAnimation({ ...record, uuid });
        return uuid;
    }

    unregister(uuid: string) {
        if (!uuid) return;
        const currentAnimations = this.get((s) => s.internal.animations);
        const record = currentAnimations.get(uuid);
        const deleted = currentAnimations.delete(uuid);
        if (deleted && record) {
            this.set((state) => ({
                internal: {
                    ...state.internal,
                    animations: currentAnimations,
                    priority:
                        state.internal.priority -
                        ((record.priority || 0) > 0 ? 1 : 0),
                },
            }));
        }
    }

    addInteraction(interaction: THREE.Object3D) {
        this.set((state) => ({
            ...state,
            internal: {
                ...state.internal,
                interaction: [...state.internal.interaction, interaction],
            },
        }));
    }

    removeInteraction(uuid: string) {
        this.set((state) => ({
            ...state,
            internal: {
                ...state.internal,
                interaction: state.internal.interaction.filter(
                    (interaction) => interaction.uuid !== uuid
                ),
            },
        }));
    }

    readonly startLoop = this.effect<NgtState>(
        tap(({ invalidate }) => {
            invalidate();
        })
    );

    private readonly initRenderer = this.effect<{
        canvasElement: HTMLCanvasElement;
        advance: (
            timestamp: number,
            state?: () => NgtState,
            frame?: THREE.XRFrame
        ) => void;
    }>(
        tapEffect(({ canvasElement, advance }) => {
            const state = this.get();

            // Scene
            const scene = prepare(
                new THREE.Scene(),
                () => this.get(),
                (this.previousStore?.get(
                    (s) => s.scene
                ) as unknown as NgtUnknownInstance) || null
            );
            applyProps(scene, state.sceneOptions as UnknownRecord);

            // Set up renderer (one time only!)
            let gl = state.gl;
            if (!state.gl) {
                gl = createRenderer(state.glOptions, canvasElement);
            }
            this.set({ gl });

            // Set up raycaster (one time only!)
            let raycaster = state.raycaster;
            if (!state.raycaster) {
                raycaster = new THREE.Raycaster();
            }
            // Set raycaster options
            const { params, ...options } = state.raycasterOptions || {};
            applyProps(raycaster as any, {
                enabled: true,
                ...options,
                params: { ...raycaster.params, ...(params || {}) },
            });

            // Create default camera (one time only!)
            let camera = state.camera;
            if (!state.camera) {
                const isCamera = state.cameraOptions instanceof THREE.Camera;
                camera = isCamera
                    ? (state.cameraOptions as NgtCamera)
                    : state.orthographic
                    ? new THREE.OrthographicCamera(0, 0, 0, 0, 0.1, 1000)
                    : new THREE.PerspectiveCamera(
                          75,
                          state.size.width / state.size.height,
                          0.1,
                          1000
                      );
                if (!isCamera) {
                    camera.position.z = 5;
                    if (state.cameraOptions) {
                        applyProps(camera as any, state.cameraOptions as any);
                    }
                    // Always look at center by default
                    if (!state.cameraOptions?.rotation) {
                        camera.lookAt(0, 0, 0);
                    }
                }
            }

            // Set up XR (one time only!)
            let xr = state.xr;
            if (!state.xr) {
                // Handle frame behavior in WebXR
                const handleXRFrame: THREE.XRFrameRequestCallback = (
                    timestamp: number,
                    frame?: THREE.XRFrame
                ) => {
                    const state = this.get();
                    if (state.frameloop === 'never') return;
                    advance(timestamp, () => state, frame);
                };

                // Toggle render switching on session
                const handleSessionChange = () => {
                    const gl = this.get((s) => s.gl);
                    gl.xr.enabled = gl.xr.isPresenting;
                    // WebXRManager's signature is incorrect.
                    // See: https://github.com/pmndrs/react-three-fiber/pull/2017#discussion_r790134505
                    gl.xr.setAnimationLoop(
                        gl.xr.isPresenting ? handleXRFrame : null
                    );
                };

                // WebXR session manager
                xr = {
                    connect: () => {
                        const gl = this.get((s) => s.gl);
                        gl.xr.addEventListener(
                            'sessionstart',
                            handleSessionChange
                        );
                        gl.xr.addEventListener(
                            'sessionend',
                            handleSessionChange
                        );
                    },
                    disconnect: () => {
                        const gl = this.get((s) => s.gl);
                        gl.xr.removeEventListener(
                            'sessionstart',
                            handleSessionChange
                        );
                        gl.xr.removeEventListener(
                            'sessionend',
                            handleSessionChange
                        );
                    },
                };

                // Subscribe to WebXR session events
                if (gl.xr) xr.connect();
            }

            // Set shadowmap
            if (gl.shadowMap) {
                if (state.shadows) {
                    gl.shadowMap.enabled = true;
                    if (typeof state.shadows === 'object') {
                        Object.assign(gl.shadowMap, state.shadows);
                    } else {
                        gl.shadowMap.type = THREE.PCFSoftShadowMap;
                    }
                    gl.shadowMap.needsUpdate = true;
                }
            }

            // Set color management
            if ((THREE as any).ColorManagement) {
                (THREE as any).ColorManagement.legacyMode = state.legacy;
            }
            const outputEncoding = state.linear
                ? THREE.LinearEncoding
                : THREE.sRGBEncoding;
            const toneMapping = state.flat
                ? THREE.NoToneMapping
                : THREE.ACESFilmicToneMapping;

            if (gl.outputEncoding !== outputEncoding) {
                gl.outputEncoding = outputEncoding;
            }

            if (gl.toneMapping !== toneMapping) {
                gl.toneMapping = toneMapping;
            }

            gl.setClearAlpha(0);
            gl.setPixelRatio(makeDpr(state.viewport.dpr));
            gl.setSize(state.size.width, state.size.height);

            if (
                typeof state.glOptions === 'object' &&
                typeof state.glOptions !== 'function' &&
                !(state.glOptions instanceof THREE.WebGLRenderer)
            ) {
                applyProps(gl as any, state.glOptions as UnknownRecord);
            }

            this.set({ gl, camera, scene, raycaster });

            return () => {
                const gl = this.get((s) => s.gl);
                if (gl) {
                    gl.renderLists.dispose();
                    gl.forceContextLoss();

                    if (gl.xr && gl.xr.enabled) {
                        gl.xr.setAnimationLoop(null);
                    }
                }
            };
        })
    );

    private readonly resize = this.effect<NgtResizeResult>(
        tap(({ width, height, dpr }) => {
            this.set(({ viewport, camera }) => {
                const size = { width, height };
                return {
                    size,
                    viewport: {
                        ...viewport,
                        ...viewport.getCurrentViewport(
                            camera,
                            this.defaultTarget,
                            size
                        ),
                        dpr: makeDpr(dpr),
                    },
                };
            });
        })
    );

    private readonly updateDimensions = this.effect<{
        size: NgtSize;
        viewport: NgtViewport;
    }>(
        tap(({ size, viewport }) => {
            const { camera, gl, ready, cameraOptions } = this.get();
            if (ready) {
                // leave the userland camera alone
                if (!(cameraOptions instanceof THREE.Camera || camera.manual)) {
                    if (isOrthographicCamera(camera)) {
                        camera.left = size.width / -2;
                        camera.right = size.width / 2;
                        camera.top = size.height / 2;
                        camera.bottom = size.height / -2;
                    } else {
                        camera.aspect = size.width / size.height;
                    }

                    camera.updateProjectionMatrix();
                    // https://github.com/pmndrs/react-three-fiber/issues/178
                    // Update matrix world since the renderer is a frame late
                    camera.updateMatrixWorld();
                }

                // update renderer
                gl.setPixelRatio(viewport.dpr);
                gl.setSize(size.width, size.height);
            }
        })
    );

    private readonly registerAnimation =
        this.effect<NgtAnimationRecordWithUuid>(
            tapEffect(({ uuid, ...record }) => {
                if (uuid) {
                    this.set((state) => ({
                        internal: {
                            ...state.internal,
                            animations: new Map<string, NgtAnimationRecord>(
                                state.internal.animations
                            ).set(uuid, record),
                            priority:
                                state.internal.priority +
                                ((record.priority || 0) > 0 ? 1 : 0),
                        },
                    }));
                }

                return ({ prev: { uuid: prevUuid } = {}, complete }) => {
                    if (prevUuid !== uuid || complete) {
                        this.unregister(uuid);
                    }
                };
            })
        );

    private readonly updateSubscribers = this.effect<{
        animations: NgtInternalState['animations'];
        priority: NgtInternalState['priority'];
    }>(
        tap(({ animations, priority }) => {
            if (!animations.size) return;
            const subscribers = Array.from(animations.values());
            subscribers.sort((a, b) => (a.priority || 0) - (b.priority || 0));
            this.set((state) => ({
                internal: { ...state.internal, subscribers },
            }));
        })
    );

    private initEvents(canvasElement: HTMLCanvasElement) {
        const { handlePointer } = createEvents(() => this.get());

        this.set((state) => ({
            events: {
                ...state.events,
                handlers: Object.keys(DOM_EVENTS).reduce(
                    (handlers: UnknownRecord, supportedEventName) => {
                        handlers[supportedEventName] =
                            handlePointer(supportedEventName);
                        return handlers;
                    },
                    {}
                ) as NgtEvents,
            },
        }));

        this.connectElement(canvasElement);
    }

    private connectElement(canvasElement: HTMLCanvasElement) {
        this.set((state) => ({
            events: { ...state.events, connected: canvasElement },
        }));
        const handlers = this.get((s) => s.events.handlers);
        Object.entries(handlers ?? {}).forEach(([eventName, handler]) => {
            const passive = DOM_EVENTS[eventName as keyof typeof DOM_EVENTS];
            canvasElement.addEventListener(eventName, handler, { passive });
        });
    }

    private disconnectElement() {
        const { handlers, connected } = this.get((s) => s.events);
        if (connected) {
            Object.entries(handlers ?? {}).forEach(([eventName, handler]) => {
                if (connected instanceof HTMLElement) {
                    connected.removeEventListener(eventName, handler);
                }
            });
        }
    }

    override ngOnDestroy() {
        this.disconnectElement();
        super.ngOnDestroy();
    }
}

function createRenderer(
    glOptions: NgtGLOptions,
    canvasElement: HTMLCanvasElement
): THREE.WebGLRenderer {
    const customRenderer = (
        typeof glOptions === 'function' ? glOptions(canvasElement) : glOptions
    ) as THREE.WebGLRenderer;

    if (customRenderer?.render != null) {
        return customRenderer;
    }

    return new THREE.WebGLRenderer({
        powerPreference: 'high-performance',
        canvas: canvasElement,
        antialias: true,
        alpha: true,
        ...glOptions,
    });
}