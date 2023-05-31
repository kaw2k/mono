import { TreeClass, Leaf } from '../../types/Tree'
import { scrapeVerse } from './scrapeVerse'
import progress from 'cli-progress'

export async function scrapeLeaves(tree: TreeClass): Promise<Leaf[]> {
  let leaves: Leaf[] = []
  let totalLeaves = tree.numLeaves()
  let count = 0

  const bar = new progress.SingleBar(
    {
      etaBuffer: 1000,
    },
    progress.Presets.shades_classic
  )
  bar.start(totalLeaves, 0)

  await tree.forEachLeaf(async (leaf) => {
    const leafData = await scrapeVerse(leaf.path)
    leaves.push(leafData)
    bar.update(count++)
  })

  bar.update(totalLeaves)
  bar.stop()

  return leaves
}
