'use client'

import { TABLET } from '../../../../components/layouts'
import { VStack } from 'every-layout/src/web/vstack'
import { useRouter } from 'next/navigation'
import { Button } from '../../../../components/clickable'
import { HStack } from 'every-layout/src/web/hstack'
import { Box } from 'every-layout/src/web/box'
import { useTheme } from '../../../../hooks/useTheme'
import { Leaf } from 'verses-shared/types/Tree'

interface LeafDetailProps {
  leaf: Leaf
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
      <Box>
        <HStack>
          <Button className="verse-detail-back" onClick={router.back}>
            back
          </Button>
          <strong>title</strong>
        </HStack>
      </Box>

      <VStack scroll gap="0" className="leaf-detail--list">
        <Box>
          <h2>Text</h2>
          <Sanskrit>{leaf.text}</Sanskrit>
        </Box>

        <Box>
          <h2>Synonyms</h2>
          <Sanskrit>{leaf.synonyms}</Sanskrit>
        </Box>

        <Box>
          <h2>Translation</h2>
          <p>{leaf.translation}</p>
        </Box>

        {!!leaf.purport.length && (
          <Box>
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
          </Box>
        )}
      </VStack>

      <style jsx>{`
        .root {
          flex-grow: 1;
        }
      `}</style>

      <style jsx>{`
        @media screen and (min-width: ${TABLET}) {
          .root {
            min-width: 500px;
          }

          :global(.verse-detail-back) {
            display: none;
          }
        }

        :global(.leaf-detail--list) {
          padding-bottom: env(safe-area-inset-bottom);
        }
      `}</style>
    </div>
  )
}
