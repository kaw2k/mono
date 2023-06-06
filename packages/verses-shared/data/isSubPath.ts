import { PathId, Tree, splitPathId } from '../types/Tree'

export function isSubPath(currentPath: PathId, compareToPath: PathId): boolean {
  const splitTreePath = splitPathId(currentPath)
  const splitPath = splitPathId(compareToPath)
  const len = splitTreePath.length

  return (
    splitPath.slice(0, len).join('/') === splitTreePath.slice(0, len).join('/')
  )
}

export function isTreeSubPath(tree: Tree, pathId: PathId): boolean {
  return isSubPath(tree.path, pathId)
}
