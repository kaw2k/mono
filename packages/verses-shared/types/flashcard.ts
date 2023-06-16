import { Opaque } from 'toolbox/types/opaque'
import { Id } from 'toolbox/types/id'
import { PathId } from './Tree'

export interface Facet {
  id: FacetId
  label: string
  value: string
}

export interface Flashcard {
  id: FlashcardId
  title: string
  subTitle?: string
  description?: string
  owner: UserId
  facets: Facet[]
  step: Steps
  history: {
    date: string
    nextStep: Steps
    rating: Rating
  }[]
  dateAdded: string
  pathId?: PathId
}

export type FlashcardId = Opaque<Id, 'flashcard id'>
export const FlashcardId = (id: string) => id as FlashcardId

export type UserId = Opaque<Id, 'user id'>
export const UserId = (id: string) => id as UserId

export type FacetId = Opaque<Id, 'faccet id'>
export const FacetId = Id as (id?: string) => FacetId

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
