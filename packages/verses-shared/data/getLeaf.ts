import { Tree, Leaf, Node, PathId, splitPathId, TreeId } from '../types/Tree'
import { isTreeSubPath } from './isSubPath'
import treesJson from './trees.json'

const trees = treesJson as Tree[]

type Falsey = undefined | null

type NodeWithoutChildren = Omit<Node, 'children'>
type GetPathReturn = [...NodeWithoutChildren[], Leaf] | Falsey

export function getLeaf(pathId: PathId): GetPathReturn {
  function getPath(tree: Tree | undefined): GetPathReturn {
    // Not found
    if (!tree) return

    // Exact match
    if (tree.type === 'leaf' && tree.path === pathId) {
      return [tree]
    }

    // Node case
    if (tree.type !== 'leaf') {
      const { children, ...restOfTree } = tree
      const res = getPath(children.find((t) => isTreeSubPath(t, pathId)))
      return res ? [restOfTree, ...res] : null
    }

    // Not found
    return null
  }

  const firstId = splitPathId(pathId)[0]
  return getPath(trees.find((t) => t.id === firstId))
}
