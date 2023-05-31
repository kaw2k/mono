import { Leaf, LeafId } from '../types/Tree'
import leavesJson from './leaves.json'

const leaves = leavesJson as Leaf[]

export function getLeaf(leafId: LeafId) {
  return leaves.find((l) => {
    return l.id === leafId
  })
}
