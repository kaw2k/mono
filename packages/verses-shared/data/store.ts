import {
  Verse,
  VerseCompressed,
  VerseId,
  VerseIdComponents,
  decodeVerseId,
} from '../types/verse'
import { WrittenWork } from '../types/written-work'

export default class Store<V extends Verse | VerseCompressed> {
  type: 'compressed' | 'uncompressed'
  data: WrittenWork<V>[]

  constructor(type: 'compressed' | 'uncompressed', data: WrittenWork<V>[]) {
    this.type = type
    this.data = data
  }

  static createCompressedStore(data: any) {
    return new Store<VerseCompressed>('compressed', data)
  }

  static createUncompressedStore(data: any) {
    return new Store<Verse>('uncompressed', data)
  }

  getVerseById(verseId: VerseId): V | undefined {
    const { workId } = decodeVerseId(verseId)

    return this.data
      .find((w) => w.id === workId)
      ?.verses.find((v) => this.getVerseId(v) === verseId)
  }

  getBrowsingData(params: Partial<VerseIdComponents>) {
    const works = this.data
    const work = works.find((w) => w.id === params.workId)
    const books = work?.books
    let book = books?.find((b) => b.id === params.bookId)
    if (books && books.length === 1) book = books[0]
    const chapters = book?.chapters
    const chapter = chapters?.find((c) => c.number === params.chapter)
    const verses = work?.verses.filter((v) => {
      const { chapter: chapterNumber } = decodeVerseId(this.getVerseId(v))
      return chapterNumber === params.chapter
    })
    const verse = verses?.find((v) => this.getVerseId(v) === params.verse)
    return {
      works: works.map((w) => ({ ...w, verses: [] })),
      work: work ? { ...work, verses: [] } : undefined,
      books,
      book,
      chapters,
      chapter,
      verses,
      verse,
    }
  }

  private getVerseId(verse: V): VerseId {
    if (Array.isArray(verse)) {
      return verse[0]
    } else {
      return verse.id
    }
  }
}
