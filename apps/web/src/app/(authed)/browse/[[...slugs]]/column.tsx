'use client'

import { useRouter } from 'next/navigation'
import { TABLET } from '../../../../components/layouts'
import { useTheme } from '../../../../hooks/useTheme'
import { Button } from '../../../../components/clickable'
import { HStack } from 'every-layout/src/web/hstack'
import { VStack } from 'every-layout/src/web/vstack'

interface ColumnProps extends React.PropsWithChildren {
  title: string
  canGoBack?: boolean
}

export const Column: React.FC<ColumnProps> = ({
  children,
  title,
  canGoBack,
}) => {
  return (
    <div className="browse-column">
      <ColumnTitle title={title} canGoBack={canGoBack} />

      <VStack
        component="ul"
        scroll
        className="browse-column--list"
        safeArea={['m-b']}>
        {children}
      </VStack>

      <style jsx>{`
        .browse-column {
          flex-grow: 1;
          display: flex;
          flex-flow: column;
        }
      `}</style>

      <style jsx>{`
        @media screen and (min-width: ${TABLET}) {
          .browse-column {
            width: 300px;
            border-right: 1px solid #ccc;
            flex-grow: 0;
            flex-shrink: 0;
          }
        }
      `}</style>
    </div>
  )
}

interface ColumnTitleProps {
  canGoBack?: boolean
  title: string
}

const ColumnTitle: React.FC<ColumnTitleProps> = ({ canGoBack, title }) => {
  const router = useRouter()
  const theme = useTheme()

  return (
    <>
      <div className="root">
        {canGoBack ? (
          <HStack className="column-title-anchor" align="center">
            <Button className="back-button" onClick={router.back}>
              back
            </Button>
            <h3>{title}</h3>
          </HStack>
        ) : (
          <div className="column-title-anchor">{title}</div>
        )}
      </div>

      <style jsx>{`
        .root {
          background-color: ${theme.backgrounds.primary};
          padding: 1em;
          border-bottom: 1px solid #ccc;
          flex-grow: 0;
        }

        :global(.column-title-anchor) {
          display: block;
        }

        @media (min-width: ${TABLET}) {
          :global(.back-button) {
            display: none;
          }
        }
      `}</style>
    </>
  )
}
