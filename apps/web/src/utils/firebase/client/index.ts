'use client'

import { getApp, getApps, initializeApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { ajax } from '../../fetch'

const firebaseConfig =
  typeof window !== 'undefined' && window.Cypress
    ? {
        apiKey: Cypress.env('NEXT_PUBLIC_FIREBASE_VERSES_API_KEY'),
        authDomain: Cypress.env('NEXT_PUBLIC_FIREBASE_VERSES_AUTH_DOMAIN'),
        projectId: Cypress.env('NEXT_PUBLIC_FIREBASE_VERSES_PROJECT_ID'),
        storageBucket: Cypress.env(
          'NEXT_PUBLIC_FIREBASE_VERSES_STORAGE_BUCKET'
        ),
        messagingSenderId: Cypress.env(
          'NEXT_PUBLIC_FIREBASE_VERSES_MESSAGING_SENDER_ID'
        ),
        appId: Cypress.env('NEXT_PUBLIC_FIREBASE_VERSES_APP_ID'),
        measurementId: Cypress.env(
          'NEXT_PUBLIC_FIREBASE_VERSES_MEASUREMENT_ID'
        ),
      }
    : {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_VERSES_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_VERSES_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_VERSES_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_VERSES_STORAGE_BUCKET,
        messagingSenderId:
          process.env.NEXT_PUBLIC_FIREBASE_VERSES_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_VERSES_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_VERSES_MEASUREMENT_ID,
      }

export const app = getApps()?.length ? getApp() : initializeApp(firebaseConfig)

export const auth = getAuth()

export async function signIn(email: string, password: string) {
  const user = await signInWithEmailAndPassword(auth, email, password)
  ajax.setAuthToken(await user.user.getIdToken(true))
  return user
}

export async function register(email: string, password: string) {
  const user = await createUserWithEmailAndPassword(auth, email, password)
  ajax.setAuthToken(await user.user.getIdToken(true))
  return user
}

export function logout() {
  ajax.clearAuthToken()
  return signOut(auth)
}

const googleAuthProvider = new GoogleAuthProvider()
export async function signInWithGoogle() {
  const user = await signInWithPopup(auth, googleAuthProvider)
  ajax.setAuthToken(await user.user.getIdToken(true))
  return user
}
