import { Node, PathId, Tree, TreeId } from '../types/Tree'
import { isTreeSubPath } from './isSubPath'
import treesJson from './trees.json'

const trees = treesJson as Tree[]

export function getColumns(pathId: PathId): Tree[] {
  function getData(tree: Tree | null | undefined): Tree[] | null | undefined {
    if (!tree) return null

    if (tree.type === 'leaf') return [tree]

    if (isTreeSubPath(tree, pathId)) {
      let children: Tree[] = []
      let selected: Tree[] | null | undefined = null

      tree.children.forEach((child) => {
        if (isTreeSubPath(child, pathId)) {
          selected = getData(child)
        }

        children.push(
          child.type === 'leaf' ? child : { ...child, children: [] }
        )
      })

      return [{ ...tree, children }, ...(selected || [])]
    }

    return null
  }

  const rootNode: Tree = {
    type: 'explore',
    title: 'Explore',
    id: TreeId('explore'),
    path: PathId(['browse']),
    children: trees.map((t) =>
      t.type === 'leaf' ? t : { ...t, children: [] }
    ),
  }

  const firstNode = trees.find((t) => isTreeSubPath(t, pathId))

  return [rootNode, ...(getData(firstNode) || [])]
}
