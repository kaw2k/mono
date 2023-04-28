'use client'

type Props = React.PropsWithChildren<{
  space?: number | string
  component?: string
}>

export function VStack({ children, space = 0, component = 'div' }: Props) {
  const Tag = component as any

  return (
    <Tag className="l-vstack">
      {children}

      <style jsx>{`
        .l-vstack > :global(*) {
          margin-top: ${space};
        }
      `}</style>
    </Tag>
  )
}
