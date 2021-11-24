import { generateFiles, getWorkspaceLayout, Tree } from '@nrwl/devkit';
import { join } from 'path';
import { additionalSobaShapesSelectors } from './soba-shapes-selectors';

const additionalSobaSelectors = [
  'ngt-soba-image',
  'ngt-soba-text',
  'ngt-soba-line',
  'ngt-soba-quadratic-bezier-line',
  'ngt-soba-cubic-bezier-line',
  'ngt-soba-positional-audio',
  'ngt-soba-billboard',
] as const;

async function object3dGenerator(tree: Tree, derivedObject3Ds: string[]) {
  const { libsDir } = getWorkspaceLayout(tree);
  generateFiles(
    tree,
    join(__dirname, 'files'),
    join(libsDir, 'core', 'src', 'lib', 'three'),
    {
      selectors: [
        ...derivedObject3Ds,
        ...additionalSobaSelectors,
        ...additionalSobaShapesSelectors,
      ].map((selector, index) => ({
        selector,
        isLast: index === derivedObject3Ds.length - 1,
      })),
      tmpl: '',
    }
  );
}

export default object3dGenerator;
