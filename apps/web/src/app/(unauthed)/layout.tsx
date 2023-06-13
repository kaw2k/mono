import { HStack } from 'every-layout/src/web/hstack'
import { VStack } from 'every-layout/src/web/vstack'
import { Link } from '../../components/clickable'
import { Box } from 'every-layout/src/web/box'
import { ValidateUnauthed } from './components/validateUnauthed'

type Props = React.PropsWithChildren<{}>

export default function UnauthLayout({ children }: Props) {
  return (
    <Box>
      <ValidateUnauthed />
      <VStack>
        <h1>Auth</h1>
        <nav>
          <HStack gap={0}>
            <Link href="/login">login</Link>
            <Link href="/register">register</Link>
          </HStack>
        </nav>
        <main>{children}</main>
      </VStack>
    </Box>
  )
}
