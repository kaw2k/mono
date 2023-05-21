'use client'

import clsx from 'clsx'
import type { FlexAlign, FlexJustify } from './types'

type Props = React.PropsWithChildren<{
  space?: string
  wrap?: boolean
  component?: string
  justify?: FlexJustify
  align?: FlexAlign
  className?: string
}>

export function HStack({
  children,
  space = '0',
  wrap,
  component = 'div',
  align,
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
          gap: ${space};
          flex-wrap: ${wrap ? 'wrap' : 'nowrap'};
          align-items: ${align};
          justify-content: ${justify};
        }
      `}</style>
    </Tag>
  )
}
