'use client'

type Props = React.PropsWithChildren<{
  space?: number | string
  component?: string
}>

export default function VStack({
  children,
  space = 0,
  component = 'divj',
}: Props) {
  const Tag = component as any
  return (
    <Tag className="root">
      {children}

      <style jsx>{`
        .root > :global(*) + :global(*) {
          margin-top: ${space};
        }
      `}</style>
    </Tag>
  )
}
