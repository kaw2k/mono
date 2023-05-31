import $ from 'cheerio'
import { LeafId, Tree } from '../../types/Tree'
import { getWebsite } from './getWebsite'

export async function scrapeChapter(ids: string[]): Promise<Tree> {
  const url = `https://vedabase.io/en/library/${ids.join('/')}`

  const lastId = ids[ids.length - 1]
  if (!lastId) throw new Error('No last id')

  const rawHtml = await getWebsite(url)

  const $root = $(rawHtml)
  const title = $root.find('.r-chapter-title h1').text()

  const children = $root
    .find('.r-verse')
    .toArray()
    .map((e) => {
      const slugs = $(e).find('a').attr('href')?.split('/') || []
      return slugs[slugs.length - 2]
    })
    .map((verseNumber): Tree => {
      return {
        id: verseNumber,
        path: LeafId([...ids, verseNumber]),
        columnTitle: 'Verses',
      }
    })

  return {
    id: lastId,
    title: title,
    children,
    path: LeafId(ids),
    columnTitle: 'Chapters',
  }
}
