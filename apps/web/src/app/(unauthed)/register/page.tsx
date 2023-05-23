'use client'

import { HStack } from 'every-layout/src/web/hstack'
import { VStack } from 'every-layout/src/web/vstack'
import { register } from '../../../utils/firebase/client'

export default function Register() {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    register(e.currentTarget.email.value, e.currentTarget.password.value)
  }

  return (
    <form onSubmit={onSubmit}>
      <VStack space="1em">
        <h1>Register</h1>
        <HStack gap="1em" align="center">
          <label htmlFor="email">Email:</label>
          <input type="email" placeholder="email" name="email" />
        </HStack>
        <HStack gap="1em" align="center">
          <label htmlFor="password">Password:</label>
          <input type="password" placeholder="password" name="password" />
        </HStack>
        <button type="submit">Register</button>
      </VStack>
    </form>
  )
}
