import { getApps, initializeApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { ajax } from '../../fetch'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FB_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FB_MEASUREMENT_ID,
}

export const app = getApps().length
  ? getApps()[0]
  : initializeApp(firebaseConfig)

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
