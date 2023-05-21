import { Id } from 'toolbox/types/id'
import { Verse } from './verse'

export interface FlashcardRecomendation {
  id: Id
  title: string
  description: string
  verseIds: Verse['id'][]
}
