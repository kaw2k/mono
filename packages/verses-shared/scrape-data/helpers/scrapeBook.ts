import $ from 'cheerio'
import { scrapeChapter } from './scrapeChapter'
import { LeafId, Tree } from '../../types/Tree'
import { getWebsite } from './getWebsite'

export async function scrapeBook(ids: string[]): Promise<Tree> {
  const url = `https://vedabase.io/en/library/${ids.join('/')}`

  const lastId = ids[ids.length - 1]
  if (!lastId) throw new Error('No last id')

  const rawHtml = await getWebsite(url)
  const $root = $(rawHtml)
  const title = $root.find('.r-title h1').text()

  console.log(`Indexing Book: ${title}`)

  const chapters = $root
    .find('.r-chapter a')
    .toArray()
    .filter((e) => /Chapter/i.test($(e).text()))
    .map((e) => {
      const slugs = $(e).attr('href')?.split('/') || []

      return slugs[slugs.length - 2]
    })

  let children: Promise<Tree>[] = []
  for (let chapter of chapters) {
    children.push(scrapeChapter([...ids, chapter]))
  }

  return {
    id: lastId,
    path: LeafId(ids),
    title,
    children: await Promise.all(children),
    columnTitle: 'Books',
  }
}
