'use client'

import Link from 'next/link'

export const Tabs: React.FC<{ type: 'vertical' | 'horizontal' }> = ({
  type,
}) => {
  return (
    <ul className="root">
      <Link href="/browse">Browse</Link>

      <style jsx>{`
        .root {
          padding: 1em;
          padding-bottom: calc(1em + env(safe-area-inset-bottom));
          padding-left: max(env(safe-area-inset-left), 1em);
          gap: 1em;
          display: flex;
          flex-direction: ${type === 'vertical' ? 'column' : 'row'};
          justify-content: ${type === 'vertical'
            ? 'flex-start'
            : 'space-around'};
        }
        li {
          list-style: none;
        }
      `}</style>
    </ul>
  )
}
