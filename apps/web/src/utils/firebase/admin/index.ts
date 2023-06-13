import firebaseAdmin from 'firebase-admin'
import key from './key.json'

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      clientEmail: key.client_email,
      privateKey: key.private_key,
      projectId: key.project_id,
    }),
  })
}

export const admin = firebaseAdmin

export const validateToken = async (token: string) => {
  return admin.auth().verifyIdToken(token)
}
