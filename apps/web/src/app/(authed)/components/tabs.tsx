'use client'

import { getSafeArea } from 'every-layout/src/web/helpers/safeAreas'
import { Button, Link } from '../../../components/clickable'
import { useTheme } from '../../../hooks/useTheme'
import { auth } from '../../../utils/firebase/client'

export const Tabs: React.FC<{ type: 'vertical' | 'horizontal' }> = ({
  type,
}) => {
  const theme = useTheme()

  return (
    <ul className="root" test-id="tab-bar">
      <Link href="/browse">Browse</Link>
      <Link href="/flashcards">Flashcards</Link>
      <Link href="/learn">Learn</Link>
      <Button variant="link" onClick={() => auth.signOut()}>
        Log out
      </Button>

      <style jsx>{`
        .root {
          padding: 1em;
          padding-bottom: calc(2em + env(safe-area-inset-bottom));
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
