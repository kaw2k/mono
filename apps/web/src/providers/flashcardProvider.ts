'use client'

import { makeFlashcardProvider } from 'verses-shared/makeProvider/makeFlashcardProvider'
import { makeFirestoreStorageWeb } from 'verses-shared/makeStorage/makeFirestoreStorageWeb'
import { makeLocalStorage } from 'verses-shared/makeStorage/makeLocalStorage'
import { Flashcard } from 'verses-shared/types/flashcard'

export const [FlashcardProvider, useFlashcards] = makeFlashcardProvider(
  makeFirestoreStorageWeb<Flashcard>('flashcards'),
  makeLocalStorage<Flashcard[]>('flashcards')
)
