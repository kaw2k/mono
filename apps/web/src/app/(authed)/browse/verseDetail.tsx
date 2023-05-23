'use client'

import { Verse, VerseId, decodeVerseId } from 'verses-shared/types/verse'
import { TABLET } from '../../../components/layouts'
import { VStack } from 'every-layout/src/web/vstack'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '../../../components/clickable'
import { HStack } from 'every-layout/src/web/hstack'
import { Box } from 'every-layout/src/web/box'
import { useTheme } from '../../../hooks/useTheme'

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
  const theme = useTheme()
  const { bookId, chapter, verse, workId } = decodeVerseId(verseId)
  const router = useRouter()
  const data = useVerse(verseId)

  const title =
    typeof data === 'object'
      ? `${data.writtenWorkId} ${data.chapterNumber}:${data.verseNumber}`
      : 'Loading...'

  return (
    <div className="root">
      <Box className="verse-detail-sticky">
        <HStack>
          <Button onClick={router.back}>back</Button>
          <strong>{title}</strong>
        </HStack>
      </Box>

      <Box>
        {data === 'loading' && 'loading...'}
        {data === 'not-found' && 'not found'}
        {typeof data === 'object' && (
          <VStack>
            <Sanskrit>{data.text}</Sanskrit>
            <Sanskrit>{data.synonyms}</Sanskrit>
            <p>{data.translation}</p>
          </VStack>
        )}
      </Box>

      <style jsx>{`
        .root {
          overflow-y: auto;
          flex-grow: 1;
        }

        :global(.verse-detail-sticky) {
          position: sticky;
          top: 0;
          background-color: ${theme.backgrounds.primary};
        }
      `}</style>

      <style jsx>{`
        @media screen and (min-width: ${TABLET}) {
          .root {
            min-width: 400px;
          }
        }
      `}</style>
    </div>
  )
}
