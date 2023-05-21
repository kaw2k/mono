'use client'

import clsx from 'clsx'
import { HStack } from 'every-layout/src/web/hstack'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { VerseIdComponents } from 'verses-shared/types/verse'
import { TABLET } from '../../../components/layouts'

export const Row: React.FC<
  React.PropsWithChildren<{
    params?: Partial<VerseIdComponents>
  }>
> = ({ children, params }) => {
  return (
    <>
      <li className={clsx('root')}>
        {params ? (
          <Link
            className="row-anchor"
            href={{
              pathname: '/browse',
              query: params,
            }}>
            {children}
          </Link>
        ) : (
          <div className="row-anchor">{children}</div>
        )}
      </li>

      <style jsx>{`
        :global(.row-anchor) {
          display: block;
          padding: 1em;
          border-bottom: 1px solid #ccc;
        }
      `}</style>
    </>
  )
}

export const RowHeader: React.FC<
  React.PropsWithChildren<{
    canGoBack?: boolean
  }>
> = ({ children, canGoBack }) => {
  const router = useRouter()
  return (
    <>
      <li className={clsx('root', 'sticky')}>
        {canGoBack ? (
          <HStack className="row-anchor" space="1em" align="center">
            <button onClick={router.back}>back</button>
            <div>{children}</div>
          </HStack>
        ) : (
          <div className="row-anchor">{children}</div>
        )}
      </li>

      <style jsx>{`
        :global(.row-anchor) {
          display: block;
          padding: 1em;
          border-bottom: 1px solid #ccc;
        }
        .sticky {
          position: sticky;
          top: 0;
          background-color: white;
        }

        @media (min-width: ${TABLET}) {
          button {
            display: none;
          }
        }
      `}</style>
    </>
  )
}
