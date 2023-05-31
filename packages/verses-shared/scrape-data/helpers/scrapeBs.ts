import $ from 'cheerio'
import { scrapeChapter } from './scrapeChapter'
import { LeafId, Tree } from '../../types/Tree'
import { getWebsite } from './getWebsite'

export async function scrapeBrahmaSamhita(): Promise<Tree> {
  const id = 'bs'
  const url = `https://vedabase.io/en/library/${id}`

  const rawHtml = await getWebsite(url)
  const $root = $(rawHtml)
  const title = $root.find('.r-title h1').text()

  console.log(`Indexing Book: ${title}`)

  return {
    id,
    title,
    children: [await scrapeChapter(['bs', '5'])],
    path: LeafId([id]),
    columnTitle: 'Works',
  }
}
