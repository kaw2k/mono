import fs from 'fs'
import { scrapeBook } from './helpers/scrapeBook'
import { scrapeAnthology } from './helpers/scrapeAnthology'
import { scrapeBrahmaSamhita } from './helpers/scrapeBs'
import { TreeIterator } from '../types/Tree'
import { scrapeLeaves } from './helpers/scrapeLeaves'

async function scrape() {
  const bsTree = TreeIterator.init(await scrapeBrahmaSamhita())
  const bsLeaves = await scrapeLeaves(bsTree)

  const bgTree = TreeIterator.init(await scrapeBook(['bg']))
  const bgLeaves = await scrapeLeaves(bgTree)

  const ccTree = TreeIterator.init(await scrapeAnthology('cc'))
  const ccLeaves = await scrapeLeaves(ccTree)

  const sbTree = TreeIterator.init(await scrapeAnthology('sb'))
  const sbLeaves = await scrapeLeaves(sbTree)

  fs.writeFileSync(
    './data/trees.json',
    JSON.stringify([
      bsTree.toJSON(),
      bgTree.toJSON(),
      ccTree.toJSON(),
      sbTree.toJSON(),
    ])
  )

  fs.writeFileSync(
    './data/leaves.json',
    JSON.stringify([...bsLeaves, ...bgLeaves, ...ccLeaves, ...sbLeaves])
  )
}

scrape()
