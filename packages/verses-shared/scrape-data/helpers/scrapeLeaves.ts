import { TreeClass, Leaf, LeafId } from '../../types/Tree'
import { scrapeVerse } from './scrapeVerse'
import progress from 'cli-progress'

export async function scrapeLeaves(tree: TreeClass): Promise<Leaf[]> {
  const chunkSize = 40

  let ids: LeafId[] = []
  let leaves: Leaf[] = []
  let totalLeaves = tree.numLeaves()

  await tree.forEachLeaf(async (leaf) => {
    ids.push(leaf.path)
  })

  const bar = new progress.SingleBar(progress.Presets.shades_classic)
  bar.start(ids.length, 0)

  do {
    let chunk = await Promise.all(
      ids.splice(0, chunkSize).map((id) => scrapeVerse(id))
    )
    leaves = leaves.concat(chunk)
    bar.update(leaves.length)
  } while (ids.length > 0)

  bar.update(totalLeaves)
  bar.stop()

  return leaves
}
