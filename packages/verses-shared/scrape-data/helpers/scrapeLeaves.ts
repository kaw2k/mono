import { Leaf, PathId } from '../../types/Tree'
import { scrapeVerse } from './scrapeVerse'

const chunkSize = 40

export async function scrapeLeaves(paths: PathId[]): Promise<Leaf[]> {
  return new Promise(async (resolve) => {
    let leaves: Leaf[] = []
    do {
      let chunk = await Promise.all(
        paths.splice(0, chunkSize).map((id) => scrapeVerse(id))
      )
      leaves = leaves.concat(chunk)
    } while (paths.length > 0)

    resolve(leaves)
  })
}
