import $ from 'cheerio'
import { sleep } from './sleep'
import { getWebsite } from './getWebsite'
import { Leaf, LeafId, Paragraph, splitLeafId } from '../../types/Tree'

function parseVerse($verses: cheerio.Cheerio): string[] {
  let $modified = $verses.clone()

  $modified.find('br').replaceWith('\n')

  return $modified.toArray().map((e) => {
    return $(e).text()
  })
}

function parsePurport($purport: cheerio.Cheerio): Paragraph[] {
  let $modified = $purport.clone()

  return $modified.toArray().map((e) => {
    if ($(e).hasClass('r-verse-text')) {
      return {
        type: 'verse',
        text: parseVerse($(e)),
      }
    } else {
      return {
        type: 'text',
        text: [$(e).text()],
      }
    }
  })
}

export async function scrapeVerse(id: LeafId): Promise<Leaf> {
  const url = `https://vedabase.io/en/library/${splitLeafId(id).join('/')}`
  const text = await getWebsite(url)
  const $root = $(text)
  const $verse = $root.find('.wrapper-verse-text .r-verse-text')
  const $synonyms = $root.find('.wrapper-synonyms .r-synonyms')
  const $translation = $root.find('.wrapper-translation .r-translation')
  const $purport = $root.find(
    '.wrapper-puport .r-paragraph, .wrapper-puport .r-verse-text'
  )

  return {
    link: url,
    id: id,
    text: parseVerse($verse),
    synonyms: $synonyms.text(),
    translation: $translation.text(),
    purport: parsePurport($purport),
  }
}
