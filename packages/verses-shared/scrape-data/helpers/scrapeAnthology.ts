import $ from 'cheerio'
import { getWebsite } from './getWebsite'
import { PathId, Tree, TreeId } from '../../types/Tree'
import { scrapeBook } from './scrapeBook'

export async function scrapeAnthology(id: string): Promise<Tree> {
  const url = `https://vedabase.io/en/library/${id}`

  const text = await getWebsite(url)
  const $root = $(text)
  const title = $root.find('.r-title.r-book h1').text()

  console.log(`Indexing Anthology: ${title}`)

  const books = $root
    .find('.book-item .book-title')
    .toArray()
    .map((e) => {
      const slugs = $(e).attr('href')?.split('/') || []

      return slugs[slugs.length - 2]
    })

  let children: Tree[] = []

  for (let book of books) {
    children.push(await scrapeBook([id, book]))
  }

  return {
    id: TreeId(id),
    title,
    children,
    path: PathId([id]),
    type: 'work',
  }
}
