import { HStack } from 'every-layout/src/web/hstack'
import { VStack } from 'every-layout/src/web/vstack'
import Link from 'next/link'

type Props = React.PropsWithChildren<{}>

export default function AuthLayout({ children }: Props) {
  return (
    <VStack space="20px">
      <h1>Auth</h1>
      <nav>
        <HStack space="20px">
          <Link href="/login">login</Link>
          <Link href="/register">register</Link>
          <Link href="/forgot-password">forgot password</Link>
        </HStack>
      </nav>
      <main>{children}</main>
    </VStack>
  )
}
