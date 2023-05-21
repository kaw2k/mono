'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { VerseIdComponents } from 'verses-shared/types/verse'

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
              pathname: '/test',
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
    backParams?: Partial<VerseIdComponents>
  }>
> = ({ children, backParams }) => {
  return (
    <>
      <li className={clsx('root', 'sticky')}>
        {backParams ? (
          <Link
            className="row-anchor"
            href={{
              pathname: '/test',
              query: backParams,
            }}>
            back {children}
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
        .sticky {
          position: sticky;
          top: 0;
          background-color: white;
        }
      `}</style>
    </>
  )
}
