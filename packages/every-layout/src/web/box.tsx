'use client'

import clsx from 'clsx'
import { SpaceIncrements, space } from './space'

type Props = React.PropsWithChildren<{
  gap?: SpaceIncrements
  component?: string
  className?: string
}>

export function Box({
  className,
  children,
  gap = 0,
  component = 'div',
}: Props) {
  const Tag = component as any

  return (
    <Tag className={clsx('l-box', className)}>
      {children}

      <style jsx>{`
        .l-box {
          padding: ${space(gap, 'em')};
        }
      `}</style>
    </Tag>
  )
}
