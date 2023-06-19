'use client'

import clsx from 'clsx'
import type { FlexAlign, FlexJustify, SafeArea } from './types'
import { SpaceIncrements, space } from './space'
import { getSafeArea } from './helpers/safeAreas'

type Props = React.PropsWithChildren<{
  gap?: boolean | SpaceIncrements
  wrap?: boolean
  component?: string
  justify?: FlexJustify
  align?: FlexAlign
  className?: string
  scroll?: boolean
  safeArea?: SafeArea[]
}>

export function HStack({
  children,
  gap,
  wrap,
  component = 'div',
  align = 'center',
  justify = 'flex-start',
  safeArea = [],
  scroll,
  className,
}: Props) {
  const Tag = component as any
  const hasGap = gap !== undefined && gap !== false
  const adjustedGap = typeof gap === 'boolean' ? '0' : gap || '0'
  const safeAreas = safeArea.map((area) => getSafeArea(area, '.l-hstack'))

  return (
    <Tag className={clsx('l-hstack', className, { scroll })}>
      {children}

      <style jsx>{`
        .l-hstack {
          display: flex;
          gap: ${hasGap ? space(adjustedGap, 'em') : 0};
          flex-wrap: ${wrap ? 'wrap' : 'nowrap'};
          align-items: ${align};
          justify-content: ${justify};
        }

        .scroll {
          overflow-x: scroll;
        }

        ${safeAreas.join('\n')}
      `}</style>
    </Tag>
  )
}
