'use client'

import { HStack } from 'every-layout/src/web/hstack'
import { VStack } from 'every-layout/src/web/vstack'
import { register } from '../../../utils/firebase/client'
import React from 'react'
import { set } from 'cypress/types/lodash'
import { Button } from '../../../components/clickable'

export default function Register() {
  const [loading, setLoading] = React.useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      setLoading(true)
      e.preventDefault()
      await register(
        e.currentTarget.email.value,
        e.currentTarget.password.value
      )
    } catch (e) {
      console.log(e)
      if (typeof e === 'object' && 'code' in e) {
        switch (e.code) {
          case 'auth/email-already-in-use':
            return alert('Email already in use')
          case 'auth/invalid-email':
            return alert('Invalid email')
          case 'auth/weak-password':
            return alert('Weak password')
          default:
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
        <h1>Register</h1>
        <HStack align="center">
          <label htmlFor="email">Email:</label>
          <input type="email" placeholder="email" name="email" />
        </HStack>
        <HStack align="center">
          <label htmlFor="password">Password:</label>
          <input type="password" placeholder="password" name="password" />
        </HStack>
        <Button type="submit" disabled={loading}>
          Register
        </Button>
      </VStack>
    </form>
  )
}
