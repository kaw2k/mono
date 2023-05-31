'use client'

import { Verse, VerseId, decodeVerseId } from 'verses-shared/types/verse'
import { TABLET } from '../../../../components/layouts'
import { VStack } from 'every-layout/src/web/vstack'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '../../../../components/clickable'
import { HStack } from 'every-layout/src/web/hstack'
import { Box } from 'every-layout/src/web/box'
import { useTheme } from '../../../../hooks/useTheme'
import { Leaf, LeafId } from 'verses-shared/types/Tree'

interface LeafDetailProps {
  leaf: Leaf
}

function useLeaf(verseId: LeafId) {
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

const Sanskrit: React.FC<React.PropsWithChildren<{ center?: boolean }>> = ({
  children,
  center,
}) => {
  return (
    <div className="root">
      {children}

      <style jsx>{`
        .root {
          font-style: italic;
          white-space: pre-wrap;
          text-align: ${center ? 'center' : 'left'};
        }
      `}</style>
    </div>
  )
}

export const LeafDetail: React.FC<LeafDetailProps> = ({ leaf }) => {
  const theme = useTheme()
  const router = useRouter()

  return (
    <div className="root">
      <Box className="verse-detail-sticky">
        <HStack>
          <Button className="verse-detail-back" onClick={router.back}>
            back
          </Button>
          <strong>title</strong>
        </HStack>
      </Box>

      <Box>
        <VStack>
          <h2>Text</h2>
          <Sanskrit>{leaf.text}</Sanskrit>

          <h2>Synonyms</h2>
          <Sanskrit>{leaf.synonyms}</Sanskrit>

          <h2>Translation</h2>
          <p>{leaf.translation}</p>

          {!!leaf.purport.length && (
            <>
              <h2>Purport</h2>
              {leaf.purport.map(({ text, type }, i) => (
                <div key={i + type}>
                  {type === 'text' ? (
                    <p>{text}</p>
                  ) : (
                    <Sanskrit center>{text}</Sanskrit>
                  )}
                </div>
              ))}
            </>
          )}
        </VStack>
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

          :global(.verse-detail-back) {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}
