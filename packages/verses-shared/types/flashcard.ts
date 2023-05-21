import { Opaque } from 'toolbox/types/opaque'
import { Verse } from './verse'
import { Id } from 'toolbox/types/id'

export type FlashcardId = Opaque<Id, 'flashcard id'>
export const FlashcardId = (id: string) => id as FlashcardId

export interface Flashcard {
  id: FlashcardId
  title: string
  subTitle?: string
  description?: string
  owner: UserId
  facets: {
    id: Opaque<string, 'facet id'>
    label: string
    value: string
  }[]
  step: Steps
  history: {
    date: string
    nextStep: Steps
    rating: Rating
  }[]
  dateAdded: string
  verse?: Verse
}

export type UserId = Opaque<Id, 'user id'>
export const UserId = (id: string) => id as UserId

export interface User {
  id: UserId
  settings: {}
}

export enum Steps {
  learning = 'learning',
  one = '1',
  two = '2',
  three = '3',
  four = '4',
  five = '5',
}

export enum Rating {
  good = 'good',
  stillLearning = 'still learning',
  hard = 'hard',
}
