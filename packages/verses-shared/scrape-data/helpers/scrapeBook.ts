import $ from 'cheerio'
import { scrapeChapter } from './scrapeChapter'
import { PathId, Tree, TreeId } from '../../types/Tree'
import { getWebsite } from './getWebsite'
import progress from 'cli-progress'

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

  const bar = new progress.SingleBar(progress.Presets.shades_classic)
  bar.start(chapters.length, 0)

  let children: Tree[] = []
  for (let chapter of chapters) {
    children.push(await scrapeChapter([...ids, chapter]))
    bar.update(children.length)
  }
  bar.stop()

  return {
    id: TreeId(lastId),
    path: PathId(ids),
    title,
    children,
    type: 'book',
  }
}
