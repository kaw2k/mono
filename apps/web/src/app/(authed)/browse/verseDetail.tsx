'use client'

import { Verse, VerseId, decodeVerseId } from 'verses-shared/types/verse'
import { TABLET } from '../../../components/layouts'
import { VStack } from 'every-layout/src/web/vstack'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface VerseDetailProps {
  verseId: VerseId
}

function useVerse(verseId: VerseId) {
  const [response, setRespons] = useState<Verse | 'not-found' | 'loading'>(
    'loading'
  )

  useEffect(() => {
    setRespons('loading')
    fetch(`/api/verse/${verseId}`)
      .then((res) => res.json())
      .then((res) => {
        setRespons(res)
      })
      .catch((err) => {
        setRespons('not-found')
      })
  }, [verseId])

  return response
}

const Sanskrit: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="root">
      {children}

      <style jsx>{`
        .root {
          font-style: italic;
          white-space: pre-wrap;
        }
      `}</style>
    </div>
  )
}

export const VerseDetail: React.FC<VerseDetailProps> = ({ verseId }) => {
  const { bookId, chapter, verse, workId } = decodeVerseId(verseId)
  const router = useRouter()
  const data = useVerse(verseId)

  return (
    <div className="root">
      <VStack space="1em">
        <div className="sticky">
          <button className="back" type="button" onClick={router.back}>
            back
          </button>
        </div>

        {data === 'loading' && 'loading...'}
        {data === 'not-found' && 'not found'}
        {typeof data === 'object' && (
          <>
            <Sanskrit>{data.text}</Sanskrit>
            <Sanskrit>{data.synonyms}</Sanskrit>
            <p>{data.translation}</p>
          </>
        )}
      </VStack>

      <style jsx>{`
        .root {
          padding: 1em;
          flex-grow: 1;
        }
        .sticky {
          position: sticky;
          top: 0;
        }
      `}</style>

      <style jsx>{`
        @media screen and (min-width: ${TABLET}) {
          .root {
          }
          .back {
            border: none;
            background: none;
            padding: 0;
            font-size: inherit;
            font-family: inherit;
            color: inherit;
            cursor: pointer;
          }
        }
      `}</style>
    </div>
  )
}
