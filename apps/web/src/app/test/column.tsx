'use client'

import { TABLET } from '../../components/layouts'

export const Column: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ul className="root">{children}</ul>
      <style jsx>{`
        .root {
          overflow-y: auto;
          flex-grow: 1;
        }
      `}</style>

      <style jsx>{`
        @media screen and (min-width: ${TABLET}) {
          .root {
            width: 300px;
            border-right: 1px solid #ccc;
            flex-grow: 0;
            flex-shrink: 0;
          }
        }
      `}</style>
    </>
  )
}
