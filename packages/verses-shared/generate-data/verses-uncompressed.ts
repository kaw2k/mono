import fs from 'fs'

import bg from './raw/bg.json'
import cc from './raw/cc.json'
import bs from './raw/bs.json'
import sb from './raw/sb.json'
import { WrittenWork } from '../types/written-work'
import { Id } from 'toolbox/types/id'
import { VerseId } from '../types/verse'

type OldVerse = (typeof bg.verses)[0]

function write(data: WrittenWork[]) {
  fs.writeFileSync(
    './data/written-works-uncompressed.json',
    JSON.stringify(data)
  )
}

function convertBg(): WrittenWork {
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
    verses: verses.map((verse) => ({
      bookId: book.id,
      chapterNumber: verse.meta.chapterNumber,
      verseNumber: verse.meta.verseNumber,
      id: VerseId({
        bookId: book.id,
        workId: verse.meta.bookId,
        chapter: verse.meta.chapterNumber,
        verse: verse.meta.verseNumber,
      }),
      synonyms: verse.synonyms,
      order: verse.meta.order,
      text: verse.text,
      translation: verse.translation,
      writtenWorkId: verse.meta.bookId,
    })),
  }
}

function convertBs(): WrittenWork {
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
    verses: verses.map((verse) => ({
      id: VerseId({
        bookId: verse.meta.bookId,
        workId: verse.meta.bookId,
        chapter: '5',
        verse: verse.meta.verseNumber,
      }),
      bookId: verse.meta.bookId,
      writtenWorkId: verse.meta.bookId,
      chapterNumber: '5',
      verseNumber: verse.meta.verseNumber,
      synonyms: verse.synonyms,
      text: verse.text,
      translation: verse.translation,
      order: order++,
    })),
  }
}

function convertSb(): WrittenWork {
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

    verses: verses.map((verse: OldVerse) => ({
      id: VerseId({
        bookId: verse.meta.bookId,
        workId: 'sb',
        chapter: verse.meta.chapterNumber,
        verse: verse.meta.verseNumber,
      }),
      bookId: verse.meta.bookId,
      writtenWorkId: 'sb',
      chapterNumber: verse.meta.chapterNumber,
      verseNumber: verse.meta.verseNumber,
      synonyms: verse.synonyms,
      text: verse.text,
      translation: verse.translation,
      order: order++,
    })),
  }
}

function convertCc(): WrittenWork {
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

    verses: verses.map((verse: OldVerse) => ({
      id: VerseId({
        bookId: verse.meta.bookId,
        workId: 'cc',
        chapter: verse.meta.chapterNumber,
        verse: verse.meta.verseNumber,
      }),
      bookId: verse.meta.bookId,
      writtenWorkId: 'cc',
      chapterNumber: verse.meta.chapterNumber,
      verseNumber: verse.meta.verseNumber,
      synonyms: verse.synonyms,
      text: verse.text,
      translation: verse.translation,
      order: order++,
    })),
  }
}
write([convertBg(), convertBs(), convertSb(), convertCc()])
