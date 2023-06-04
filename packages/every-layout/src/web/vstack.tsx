'use client'

import clsx from 'clsx'
import type { FlexJustify, FlexAlign } from './types'
import { SpaceIncrements, space } from './space'

type Props = React.PropsWithChildren<{
  gap?: SpaceIncrements
  component?: string
  className?: string
  justify?: FlexJustify
  align?: FlexAlign
}>

export function VStack({
  className,
  children,
  gap = 0,
  component = 'div',
}: Props) {
  const Tag = component as any

  return (
    <Tag className={clsx('l-vstack', className)}>
      {children}

      <style jsx>{`
        .l-vstack {
          display: flex;
          flex-flow: column;
          gap: ${space(gap, 'em')};
        }
      `}</style>
    </Tag>
  )
}
