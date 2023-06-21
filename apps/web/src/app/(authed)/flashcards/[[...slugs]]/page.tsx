'use client'

import React from 'react'
import { useFlashcards } from '../../../../providers/flashcardProvider'
import { VStack } from 'every-layout/src/web/vstack'
import { Button } from '../../../../components/clickable'

interface BrowseProps {
  params: { slugs: string[] }
}

export default function Browse({ params: { slugs = [] } }: BrowseProps) {
  const flashcards = useFlashcards()

  return (
    <>
      <VStack gap="0">
        <h1>flashcards</h1>
        {flashcards.flashcards.map((f) => (
          <div key={f.id}>
            <h2>{f.title}</h2>
            <p>{f.pathId}</p>
            <Button data-test="remove" onClick={() => flashcards.delete(f)}>
              delete
            </Button>
          </div>
        ))}
      </VStack>
    </>
  )
}
