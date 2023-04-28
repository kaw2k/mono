'use client'

type Props = React.PropsWithChildren<{
  space?: number | string
  wrap?: boolean
  component?: string
}>

export default function HStack({
  children,
  space = 0,
  wrap,
  component = 'div',
}: Props) {
  const Tag = component as any

  return (
    <Tag className="root">
      {children}

      <style jsx>{`
        .root {
          display: flex;
          gap: ${space};
          flex-wrap: ${wrap ? 'wrap' : 'no-wrap'};
        }
      `}</style>
    </Tag>
  )
}
