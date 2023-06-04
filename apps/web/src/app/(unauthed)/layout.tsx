import { HStack } from 'every-layout/src/web/hstack'
import { VStack } from 'every-layout/src/web/vstack'
import { Button, Link } from '../../components/clickable'
import { Box } from 'every-layout/src/web/box'
import { headers } from 'next/headers'
import { AuthListener } from '../../utils/firebase/client/authListener'

type Props = React.PropsWithChildren<{}>

export default function UnauthLayout({ children }: Props) {
  const had = headers()

  return (
    <Box>
      <AuthListener />
      <VStack>
        <h1>Auth</h1>
        <nav>
          <HStack gap={0}>
            <Link href="/login">login</Link>
            <Link href="/register">register</Link>
            <Link href="/forgot-password">forgot password</Link>
          </HStack>
        </nav>
        <main>{children}</main>
      </VStack>
    </Box>
  )
}
