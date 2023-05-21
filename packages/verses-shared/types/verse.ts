import { Id } from 'toolbox/types/id'
import { Opaque } from 'toolbox/types/opaque'

export type VerseIdComponents = {
  bookId: string
  workId: string
  chapter: string
  verse: string
}

const idSeperator = '@'
export type VerseId = Opaque<Id, 'Partial Verse Id'>

export const VerseId = ({
  bookId,
  workId,
  chapter,
  verse,
}: VerseIdComponents) =>
  [workId, bookId, chapter, verse].join(idSeperator) as VerseId

export const decodeVerseId = (id: VerseId): VerseIdComponents => {
  const [workId, bookId, chapter, verse] = id.split(idSeperator)
  return { workId, bookId, chapter, verse }
}

export interface Verse {
  id: VerseId
  bookId: string
  writtenWorkId: string

  chapterNumber: string
  verseNumber: string

  text: string[]
  synonyms: string
  translation: string

  order: number
}

export type Translation = Opaque<'translation', string>
export const Translation = (translation: string) =>
  translation.slice(0, 30) as Translation

export type Order = Opaque<'order', number>
export const Order = (order: number) => order as Order

export type VerseCompressed = [VerseId, Translation, Order]
