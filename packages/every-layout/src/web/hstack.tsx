'use client'

import clsx from 'clsx'
import type { FlexAlign, FlexJustify } from './types'
import { SpaceIncrements, space } from './space'

type Props = React.PropsWithChildren<{
  gap?: SpaceIncrements
  wrap?: boolean
  component?: string
  justify?: FlexJustify
  align?: FlexAlign
  className?: string
}>

export function HStack({
  children,
  gap = 0,
  wrap,
  component = 'div',
  align = 'center',
  justify = 'flex-start',
  className,
}: Props) {
  const Tag = component as any

  return (
    <Tag className={clsx('l-hstack', className)}>
      {children}

      <style jsx>{`
        .l-hstack {
          display: flex;
          gap: ${space(gap, 'em')};
          flex-wrap: ${wrap ? 'wrap' : 'nowrap'};
          align-items: ${align};
          justify-content: ${justify};
        }
      `}</style>
    </Tag>
  )
}
