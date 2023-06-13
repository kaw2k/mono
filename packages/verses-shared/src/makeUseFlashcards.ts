import { Flashcard, FlashcardId } from '../types/flashcard'
import { LocalStorage, Storage } from '../types/storage'
import { useEffect, useState } from 'react'
import { Id } from 'toolbox'

interface State {
  flashcards: Flashcard[]
  get: (id: string) => Flashcard | undefined
  put: (flashcard: Flashcard) => void
  delete: (flashcard: Flashcard) => void
  create: (flashcard: Omit<Flashcard, 'id'>) => void
}

const makeUseFlashcards = (
  api: Storage<Flashcard>,
  local: LocalStorage<Flashcard[]>
) => {
  return function useFlashcards(): State {
    const [flashcards, setFlashcards] = useState<Flashcard[]>([])

    useEffect(() => {
      async function run() {
        setFlashcards(await local.get())
        setFlashcards(await api.all())
      }
      run()
    }, [])

    return {
      flashcards,

      get: (id: string) => flashcards.find((f) => f.id === id),

      create: async (flashcard: Omit<Flashcard, 'id'>) => {
        const newFlashcard: Flashcard = { ...flashcard, id: FlashcardId(Id()) }
        const nextFlashcards: Flashcard[] = [...flashcards, newFlashcard]
        await local.post(nextFlashcards)
        await api.post(newFlashcard)
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
  }
}
