import firebaseAdmin from 'firebase-admin'

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      clientEmail: process.env.FIREBASE_VERSES_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_VERSES_ADMIN_PRIVATE_KEY,
      projectId: process.env.FIREBASE_VERSES_ADMIN_PROJECT_ID,
    }),
  })
}

export const admin = firebaseAdmin

export const validateToken = async (token: string) => {
  return admin.auth().verifyIdToken(token)
}
