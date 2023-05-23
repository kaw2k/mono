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
      <VStack>
        <h1>Register</h1>
        <HStack align="center">
          <label htmlFor="email">Email:</label>
          <input type="email" placeholder="email" name="email" />
        </HStack>
        <HStack align="center">
          <label htmlFor="password">Password:</label>
          <input type="password" placeholder="password" name="password" />
        </HStack>
        <button type="submit">Register</button>
      </VStack>
    </form>
  )
}
