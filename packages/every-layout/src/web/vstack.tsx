'use client'

import clsx from 'clsx'
import type { FlexJustify, FlexAlign } from './types'

type Props = React.PropsWithChildren<{
  space?: number | string
  component?: string
  className?: string
  justify?: FlexJustify
  align?: FlexAlign
}>

export function VStack({
  className,
  children,
  space = 0,
  component = 'div',
}: Props) {
  const Tag = component as any

  return (
    <Tag className={clsx('l-vstack', className)}>
      {children}

      <style jsx>{`
        .l-vstack > :global(*) + :global(*) {
          margin-top: ${space};
        }
      `}</style>
    </Tag>
  )
}
