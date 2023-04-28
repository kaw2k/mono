import Link from 'next/link'
import HStack from '../../components/layouts/hstack'
import VStack from '../../components/layouts/vstack'

type Props = React.PropsWithChildren<{}>

export default function AuthLayout({ children }: Props) {
  return (
    <VStack space="20px">
      <h1>Auth</h1>
      <nav>
        <HStack space="20px">
          <Link href="/auth/login">login</Link>
          <Link href="/auth/register">register</Link>
          <Link href="/auth/forgot-password">forgot password</Link>
        </HStack>
      </nav>
      <main>{children}</main>
    </VStack>
  )
}
