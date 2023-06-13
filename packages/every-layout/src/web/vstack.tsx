'use client'

import clsx from 'clsx'
import type { FlexJustify, FlexAlign, SafeArea } from './types'
import { SpaceIncrements, space } from './space'
import { getSafeArea } from './helpers/safeAreas'

type Props = React.PropsWithChildren<{
  gap?: SpaceIncrements
  component?: string
  className?: string
  justify?: FlexJustify
  align?: FlexAlign
  scroll?: boolean
  safeArea?: SafeArea[]
}>

export function VStack({
  className,
  children,
  gap,
  component = 'div',
  safeArea = [],
  scroll,
}: Props) {
  const Tag = component as any
  const hasGap = gap !== undefined
  const safeAreas = safeArea.map((area) => getSafeArea(area, '.l-vstack'))

  return (
    <Tag className={clsx('l-vstack', className, { scroll })}>
      {children}

      <style jsx>{`
        .l-vstack {
          display: flex;
          flex-flow: column;
          gap: ${hasGap ? space(gap, 'em') : 0};
        }

        .scroll {
          height: 100%;
          overflow-y: scroll;
          overscroll-behavior: contain;
        }

        ${safeAreas.join('\n')}
      `}</style>
    </Tag>
  )
}
