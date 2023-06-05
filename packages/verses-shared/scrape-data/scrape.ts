import fs from 'fs'
import { scrapeBook } from './helpers/scrapeBook'
import { scrapeAnthology } from './helpers/scrapeAnthology'
import { scrapeBrahmaSamhita } from './helpers/scrapeBs'

async function scrape() {
  fs.writeFileSync(
    './data/trees.json',
    JSON.stringify([
      await scrapeBrahmaSamhita(),
      await scrapeBook(['bg']),
      await scrapeAnthology('cc'),
      await scrapeAnthology('sb'),
    ])
  )
}

scrape()
