'use client'

import clsx from 'clsx'
import { SpaceIncrements, space } from './space'

type Props = React.PropsWithChildren<{
  component?: string
  className?: string
  /** The max width of the component, defaults to 60ch */
  maxWidth?: string
  /** Center text with text-align: center */
  text?: boolean
  /** Add space on the left and right of the children */
  gutters?: boolean | SpaceIncrements
  /** Center children with flexbox (applies only if children are smaller than the container) */
  intrinsic?: boolean
  /** Center children with flexbox in x and y axis */
  trueCenter?: boolean
}>

export function Center({
  className,
  children,
  component = 'div',
  maxWidth = '60ch',
  text = false,
  gutters = false,
  intrinsic = false,
  trueCenter = false,
}: Props) {
  const Tag = component as any

  const normalizedGutters = typeof gutters === 'boolean' ? '0' : gutters

  return (
    <Tag
      className={clsx('l-center', className, {
        gutters,
        text,
        intrinsic,
        trueCenter,
      })}>
      {children}

      <style jsx>{`
        .l-center {
          box-sizing: content-box;
          margin-inline: auto;
          max-inline-size: ${maxWidth};
        }

        .gutters {
          padding-inline-end: ${space(normalizedGutters, 'em')};
          padding-inline-start: ${space(normalizedGutters, 'em')};
        }

        .text {
          text-align: center;
        }

        .intrinsic {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .trueCenter {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </Tag>
  )
}
