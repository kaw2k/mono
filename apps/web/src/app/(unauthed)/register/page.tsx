'use client'

import { VStack } from 'every-layout/src/web/vstack'
import { register } from '../../../utils/firebase/client'
import React from 'react'
import { Button } from '../../../components/clickable'
import { Center } from 'every-layout/src/web/center'
import { useRouter } from 'next/navigation'

export default function Register() {
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      setLoading(true)
      await register(
        e.currentTarget.email.value,
        e.currentTarget.password.value
      )
      router.push('/browse')
    } catch (e) {
      console.log(e)
      if (typeof e === 'object' && 'code' in e) {
        switch (e.code) {
          case 'auth/email-already-in-use':
            return window.alert('Email already in use')
          case 'auth/invalid-email':
            return window.alert('Invalid email')
          case 'auth/weak-password':
            return window.alert('Weak password')
          default:
            return window.alert('Unknown error')
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
          <h1>Register</h1>
          <VStack align="center">
            <label htmlFor="email">Email:</label>
            <input type="email" placeholder="email" name="email" />
          </VStack>
          <VStack align="center">
            <label htmlFor="password">Password:</label>
            <input type="password" placeholder="password" name="password" />
          </VStack>
          <Button type="submit" disabled={loading}>
            Register
          </Button>
        </VStack>
      </form>
    </Center>
  )
}
