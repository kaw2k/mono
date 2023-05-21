import fs from 'fs'

import bg from './raw/bg.json'
import cc from './raw/cc.json'
import bs from './raw/bs.json'
import sb from './raw/sb.json'
import { Order, VerseId, Translation } from '../types/verse'
import { WrittenWorkCompressed } from '../types/written-work'

function write(data: WrittenWorkCompressed[]) {
  fs.writeFileSync('./data/written-works-compressed.json', JSON.stringify(data))
}

function convertBg(): WrittenWorkCompressed {
  const { books, verses } = bg

  const book = books[0]
  let order = 1

  return {
    id: book.id,
    type: 'book',
    title: book.title,
    books: [
      {
        id: book.id,
        title: book.title,
        chapters: book.chapters,
      },
    ],
    verses: verses.map((verse) => [
      VerseId({
        bookId: verse.meta.bookId,
        workId: verse.meta.bookId,
        chapter: verse.meta.chapterNumber,
        verse: verse.meta.verseNumber,
      }),
      Translation(verse.translation),
      Order(order++),
    ]),
  }
}

function convertBs(): WrittenWorkCompressed {
  const { books, verses } = bs
  const book = books[0]
  let order = 1

  return {
    id: book.id,
    type: 'book',
    title: book.title,
    books: [
      {
        id: book.id,
        title: book.title,
        chapters: book.chapters,
      },
    ],
    verses: verses.map((verse) => [
      VerseId({
        bookId: verse.meta.bookId,
        workId: verse.meta.bookId,
        chapter: '5',
        verse: verse.meta.verseNumber,
      }),
      Translation(verse.translation),
      Order(order++),
    ]),
  }
}

function convertSb(): WrittenWorkCompressed {
  const books = (sb as any).books
  const verses = (sb as any).verses
  let order = 1

  return {
    id: 'sb',
    type: 'anthology',
    title: 'Śrīmad-Bhāgavatam',

    books: books.map((book: any) => ({
      id: book.id,
      title: book.title,
      chapters: book.chapters,
    })),
    verses: verses.map((verse: any) => [
      VerseId({
        bookId: verse.meta.bookId,
        workId: 'sb',
        chapter: verse.meta.chapterNumber,
        verse: verse.meta.verseNumber,
      }),
      Translation(verse.translation),
      Order(order++),
    ]),
  }
}

function convertCc(): WrittenWorkCompressed {
  const books = (cc as any).books
  const verses = (cc as any).verses
  let order = 1

  return {
    id: 'cc',
    type: 'anthology',
    title: 'Chaitanya Charitamrita',

    books: books.map((book: any) => ({
      id: book.id,
      title: book.title,
      chapters: book.chapters,
    })),
    verses: verses.map((verse: any) => [
      VerseId({
        bookId: verse.meta.bookId,
        workId: 'cc',
        chapter: verse.meta.chapterNumber,
        verse: verse.meta.verseNumber,
      }),
      Translation(verse.translation),
      Order(order++),
    ]),
  }
}
write([convertBg(), convertBs(), convertSb(), convertCc()])
