// import { VStack } from 'every-layout/web/vstack'

import { Button } from 'every-layout'
import { HStack } from 'every-layout/src/web/hstack'
import { VStack } from 'every-layout/src/web/vstack'

export default function Login() {
  return (
    <div>
      <p>Login</p>

      <Button />

      <HStack space="1em">
        <p>one</p>
        <p>one</p>
        <p>one</p>
      </HStack>

      <VStack space="1em">
        <p>two</p>
        <p>two</p>
        <p>two</p>
        <p>two</p>
      </VStack>
    </div>
  )
}
