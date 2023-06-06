'use client'

import { Link } from '../../../components/clickable'
import { useTheme } from '../../../hooks/useTheme'

export const Tabs: React.FC<{ type: 'vertical' | 'horizontal' }> = ({
  type,
}) => {
  const theme = useTheme()

  return (
    <ul className="root">
      <Link href="/browse">Browse</Link>
      <Link href="#">Flashcards</Link>
      <Link href="#">Learn</Link>
      <Link href="#">Log out</Link>

      <style jsx>{`
        .root {
          padding: 1em;
          padding-bottom: calc(1em + env(safe-area-inset-bottom));
          background-color: ${theme.backgrounds.primary};
          padding-left: max(env(safe-area-inset-left), 1em);
          gap: 1em;
          display: flex;
          flex-grow: 1;
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
