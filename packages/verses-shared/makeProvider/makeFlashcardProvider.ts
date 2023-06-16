'use client'

import constate from 'constate'
import {
  Facet,
  FacetId,
  Flashcard,
  FlashcardId,
  Steps,
  User,
  UserId,
} from '../types/flashcard'
import { LocalStorage, Storage } from '../types/storage'
import { useEffect, useState } from 'react'
import { Id } from 'toolbox'
import { Leaf } from '../types/Tree'

interface State {
  flashcards: Flashcard[]
  init: (userId?: UserId) => void
  get: (id: string) => Flashcard | undefined
  put: (flashcard: Flashcard) => void
  delete: (flashcard: Flashcard) => void
  create: (flashcard: Omit<Flashcard, 'id' | 'dateAdded'>) => void
  createFromLeaf: (leaf: Leaf, owner: UserId) => void
  generateFacet: (facet: Omit<Facet, 'id'>) => Facet
}

export const makeFlashcardProvider = (
  api: Storage<Flashcard>,
  local: LocalStorage<Flashcard[]>
) => {
  return constate(function useFlashcards(): State {
    const [flashcards, setFlashcards] = useState<Flashcard[]>([])

    useEffect(() => {
      local.get().then(setFlashcards)
    }, [])

    function generateFacet(facet: Omit<Facet, 'id'>): Facet {
      return {
        ...facet,
        id: FacetId(Id()),
      }
    }

    return {
      flashcards,

      generateFacet,

      init: async (userId) => {
        if (userId) {
          const cards = await api.query([['owner', '==', userId]])
          local.post(cards)
          setFlashcards(cards)
        } else {
          local.post([])
          setFlashcards([])
        }
      },

      get: (id: string) => flashcards.find((f) => f.id === id),

      create: async (flashcard) => {
        const newFlashcard: Flashcard = {
          ...flashcard,
          id: FlashcardId(Id()),
          dateAdded: Date.now().toString(),
        }
        const nextFlashcards: Flashcard[] = [...flashcards, newFlashcard]
        await local.post(nextFlashcards)
        await api.post(newFlashcard)
        setFlashcards(nextFlashcards)
      },

      createFromLeaf: async (leaf, owner) => {
        const flashcard: Flashcard = {
          id: FlashcardId(Id()),
          owner: owner,
          history: [],
          step: Steps.learning,
          dateAdded: Date.now().toString(),
          title: 'Title',
          description: 'Description',
          subTitle: 'Sub Title',
          pathId: leaf.path,
          facets: [
            generateFacet({
              label: 'Text',
              value: leaf.text.join('\n'),
            }),
            generateFacet({
              label: 'Translation',
              value: leaf.translation,
            }),
            generateFacet({
              label: 'Verse',
              value: leaf.path,
            }),
          ],
        }
        const nextFlashcards: Flashcard[] = [...flashcards, flashcard]
        await local.post(nextFlashcards)
        await api.post(flashcard)
        setFlashcards(nextFlashcards)
      },

      put: async (flashcard: Flashcard) => {
        const nextFlashcards = flashcards.map((f) =>
          f.id === flashcard.id ? flashcard : f
        )
        await local.post(nextFlashcards)
        await api.put(flashcard.id, flashcard)

        setFlashcards(nextFlashcards)
      },

      delete: async (flashcard: Flashcard) => {
        const nextFlashcards = flashcards.filter((f) => f.id !== flashcard.id)
        await local.post(nextFlashcards)
        await api.delete(flashcard.id)
        setFlashcards(nextFlashcards)
      },
    }
  })
}
