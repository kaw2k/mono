import { HStack } from 'every-layout/src/web/hstack'
import { VStack } from 'every-layout/src/web/vstack'
import { Link } from '../../components/clickable'
import { Box } from 'every-layout/src/web/box'
import { ValidateUnauthed } from './components/validateUnauthed'
import { LayoutMain } from '../../components/layouts'
import { Center } from 'every-layout/src/web/center'

type Props = React.PropsWithChildren<{}>

export default function UnauthedLayout({ children }: Props) {
  return (
    <LayoutMain>
      <Center trueCenter>
        <Box className="unauthed-root-layout">
          <ValidateUnauthed />
          <VStack gap={2}>
            <main>{children}</main>
            <nav>
              <HStack gap={0} justify="space-around">
                <Link href="/login">login</Link>
                <Link href="/register">register</Link>
              </HStack>
            </nav>
          </VStack>
        </Box>
      </Center>
    </LayoutMain>
  )
}
