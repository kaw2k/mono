import { VStack } from 'every-layout/src/web/vstack'
import { Link } from '../components/clickable'
import { Box } from 'every-layout/src/web/box'

export default function Home() {
  return (
    <Box>
      <VStack>
        <Link variant="button" href="/browse">
          Browse
        </Link>
        <Link variant="button" href="/login">
          Login
        </Link>
        <Link variant="button" href="/register">
          Register
        </Link>
        <Link variant="button" href="/forgot-password">
          Forgot Password
        </Link>
      </VStack>
    </Box>
  )
}
