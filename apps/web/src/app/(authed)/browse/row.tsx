'use client'

import clsx from 'clsx'
import { HStack } from 'every-layout/src/web/hstack'
import { useRouter, usePathname, useParams } from 'next/navigation'
import { TABLET } from '../../../components/layouts'
import { Button, Link } from '../../../components/clickable'
import { useTheme } from '../../../hooks/useTheme'
import { isSubPath } from 'verses-shared/data/isSubPath'
import { PathId } from 'verses-shared/types/Tree'

export const Row: React.FC<
  React.PropsWithChildren<{
    href: string
  }>
> = ({ children, href }) => {
  const { slugs } = useParams()
  const isActive = isSubPath(
    PathId(href.replace('/browse/', '').split('/')),
    PathId((slugs || '').split('/'))
  )

  return (
    <>
      <li className={clsx('root', { active: isActive })}>
        {href ? (
          <Link variant="none" className="row-anchor" href={href}>
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
        .active {
          background-color: #eee;
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
  const theme = useTheme()

  return (
    <>
      <li className={clsx('root', 'sticky')}>
        {canGoBack ? (
          <HStack className="row-anchor" gap="0" align="center">
            <Button className="row-button" onClick={router.back}>
              back
            </Button>
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
        }
        .sticky {
          position: sticky;
          top: 0;
          background-color: ${theme.backgrounds.primary};
        }

        @media (min-width: ${TABLET}) {
          :global(.row-button) {
            display: none;
          }
        }
      `}</style>
    </>
  )
}
