import { PathId, Tree, splitPathId } from '../types/Tree'

export function isSubPath(tree: Tree, pathId: PathId): boolean {
  const splitTreePath = splitPathId(tree.path)
  const splitPath = splitPathId(pathId)
  const len = splitTreePath.length
  // const len = Math.max(splitPath.length, splitTreePath.length)

  // console.log(
  //   splitPath,
  //   splitTreePath,

  //   splitPath.slice(0, len).join('/') === splitTreePath.slice(0, len).join('/')
  // )

  return (
    splitPath.slice(0, len).join('/') === splitTreePath.slice(0, len).join('/')
  )
}
