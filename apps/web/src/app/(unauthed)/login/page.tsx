'use client'

import { HStack } from 'every-layout/src/web/hstack'
import { VStack } from 'every-layout/src/web/vstack'
import React from 'react'
import { signIn } from '../../../utils/firebase/client'
import { Button } from '../../../components/clickable'

export default function Login() {
  const [loading, setLoading] = React.useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      setLoading(true)
      e.preventDefault()
      await signIn(e.currentTarget.email.value, e.currentTarget.password.value)
    } catch (e) {
      if (typeof e === 'object' && 'code' in e) {
        switch (e.code) {
          case 'auth/wrong-password':
            return alert('Wrong password')
          case 'auth/user-not-found':
            return alert('User not found')
          case 'auth/too-many-requests':
            return alert('Try again later')
          default:
            console.log(e)
            return alert('Unknown error')
        }
      }
    } finally {
      setLoading(false)
    }
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
        <Button type="submit" disabled={loading}>
          Login
        </Button>
      </VStack>
    </form>
  )
}
