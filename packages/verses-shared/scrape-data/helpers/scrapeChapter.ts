import $ from 'cheerio'
import { Node, PathId, TreeId } from '../../types/Tree'
import { getWebsite } from './getWebsite'
import { scrapeLeaves } from './scrapeLeaves'

export async function scrapeChapter(ids: string[]): Promise<Node> {
  const url = `https://vedabase.io/en/library/${ids.join('/')}`

  const lastId = ids[ids.length - 1]
  if (!lastId) throw new Error('No last id')

  const rawHtml = await getWebsite(url)

  const $root = $(rawHtml)
  const title = $root.find('.r-chapter-title h1').text()

  const pathIds = $root
    .find('.r-verse')
    .toArray()
    .map((e) => {
      const slugs = $(e).find('a').attr('href')?.split('/') || []
      return slugs[slugs.length - 2]
    })
    .map((verseNumber): PathId => {
      return PathId([...ids, verseNumber])
    })

  return {
    type: 'chapter',
    id: TreeId(lastId),
    title: title,
    children: await scrapeLeaves(pathIds),
    path: PathId(ids),
  }
}
