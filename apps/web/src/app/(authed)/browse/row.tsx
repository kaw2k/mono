'use client'

import clsx from 'clsx'
import { useParams } from 'next/navigation'
import { Link } from '../../../components/clickable'
import { isSubPath } from 'verses-shared/data/isSubPath'
import { PathId } from 'verses-shared/types/Tree'

export const Row: React.FC<
  React.PropsWithChildren<{
    href: string
  }>
> = ({ children, href }) => {
  const { slugs } = useParams()
  const active = isSubPath(
    PathId(href.replace('/browse/', '').split('/')),
    PathId((slugs || '').split('/'))
  )

  return (
    <>
      <li className={clsx({ active })}>
        <Link variant="none" className="row-anchor" href={href}>
          {children}
        </Link>
      </li>

      <style jsx>{`
        :global(.row-anchor) {
          padding: 1em;
          height: 60px;
          border-bottom: 1px solid #ccc;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .active {
          background-color: #eee;
        }
      `}</style>
    </>
  )
}
