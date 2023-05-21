import { Id } from 'toolbox/types/id'
import { Verse, VerseCompressed } from './verse'

export interface WrittenWork<V> {
  id: string
  title: string
  type: 'book' | 'anthology'

  books: {
    id: string
    title: string
    chapters: {
      number: string
      title: string
      verses: string[]
    }[]
  }[]

  verses: V[]
}

export type WrittenWorkUncompressed = WrittenWork<Verse>
export type WrittenWorkCompressed = WrittenWork<VerseCompressed>

// ======================================================================================
// IDs are generated via combining with ;. For example:
// Verse: workId;bookId;chapterId;verseNumber
// Chapter: workId;bookId;chapterNumber
// Book: workId;book
// ======================================================================================

interface VerseCount {
  verseIds: NewVerse['id'][]
}

interface BaseLookup {
  id: Id
  order: number
}

interface NewVerse extends BaseLookup {
  chapterId: string
  bookId: string
  workId: string

  verseNumber: string

  text: string[]
  synonyms: string
  translation: string

  url: String
}

interface Work extends VerseCount, BaseLookup {
  title: string
  bookIds: Book['id'][]
  type: 'anthology' | 'book'
}

interface Book extends VerseCount, BaseLookup {
  // Parents
  workId: Work['id']
  chapterIds: Chapter['id'][]

  title: string
  bookNumber: string
}

interface Chapter extends VerseCount, BaseLookup {
  title: string
  chapterNumber: string

  // Parents
  bookId: Book['id']
  workId: Work['id']
}

export interface VersesDictionary {
  verses: Record<NewVerse['id'], NewVerse>
  works: Record<Work['id'], Work>
  books: Record<Book['id'], Book>
  chapters: Record<Chapter['id'], Chapter>
}
