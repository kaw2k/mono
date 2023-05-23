import { HStack } from 'every-layout/src/web/hstack'
import { VStack } from 'every-layout/src/web/vstack'
import { Link } from '../../components/clickable'

type Props = React.PropsWithChildren<{}>

export default function UnauthLayout({ children }: Props) {
  return (
    <VStack gap={1}>
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
  )
}
