import { Leaf, LeafId } from '../types/Tree'
import leavesJson from './leaves.json'

const leaves = leavesJson as Leaf[]

interface LeafMetadata {}

export function getLeaf(leafId: LeafId) {
  const leaf = leaves.find((l) => {
    return l.id === leafId
  })

  return leaf
}
