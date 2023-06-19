'use client'

import { HStack } from 'every-layout/src/web/hstack'
import { VStack } from 'every-layout/src/web/vstack'
import React from 'react'
import { signIn, signInWithGoogle } from '../../../utils/firebase/client'
import { Button } from '../../../components/clickable'
import { Center } from 'every-layout/src/web/center'

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
    <Center>
      <form onSubmit={onSubmit}>
        <VStack gap>
          <h1>Login</h1>
          <VStack align="center" justify="space-between">
            <label htmlFor="email">Email:</label>
            <input type="email" placeholder="email" name="email" />
          </VStack>
          <VStack align="center" justify="space-between">
            <label htmlFor="password">Password:</label>
            <input type="password" placeholder="password" name="password" />
          </VStack>
          <HStack gap>
            <Button onClick={signInWithGoogle}>Login with Google</Button>
            <Button type="submit" disabled={loading}>
              Login
            </Button>
          </HStack>
        </VStack>
      </form>
    </Center>
  )
}
