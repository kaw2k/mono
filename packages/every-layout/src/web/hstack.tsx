'use client'

type Props = React.PropsWithChildren<{
  space?: string
  wrap?: boolean
  component?: string
}>

export function HStack({
  children,
  space = '0',
  wrap,
  component = 'div',
}: Props) {
  const Tag = component as any

  return (
    <Tag className="l-hstack">
      {children}

      <style jsx>{`
        .l-hstack {
          display: flex;
          gap: ${space};
          flex-wrap: ${wrap ? 'wrap' : 'nowrap'};
        }
      `}</style>
    </Tag>
  )
}
