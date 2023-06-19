import { Center } from 'every-layout/src/web/center'
import { VStack } from 'every-layout/src/web/vstack'

export default function Home() {
  return (
    <Center text>
      <VStack gap="0">
        <p className="center">Welcome to</p>
        <h1 className="center">Bhaktivedanta Learning</h1>
        <p className="center">
          A place to read, learn, and memorize verses from{' '}
          <a target="_blank " href="vedabase.com">
            The Vedabase
          </a>
          .
        </p>
      </VStack>
    </Center>
  )
}
