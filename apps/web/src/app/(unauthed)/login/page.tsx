'use client'

import { HStack } from 'every-layout/src/web/hstack'
import { VStack } from 'every-layout/src/web/vstack'
import React from 'react'
import { signIn } from '../../../utils/firebase/client'

export default function Login() {
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const { user } = await signIn(
      e.currentTarget.email.value,
      e.currentTarget.password.value
    )
    console.log(user)
  }

  return (
    <form onSubmit={onSubmit}>
      <VStack>
        <h1>Login</h1>
        <HStack align="center">
          <label htmlFor="email">Email:</label>
          <input type="email" placeholder="email" name="email" />
        </HStack>
        <HStack align="center">
          <label htmlFor="password">Password:</label>
          <input type="password" placeholder="password" name="password" />
        </HStack>
        <button type="submit">Login</button>
      </VStack>
    </form>
  )
}
