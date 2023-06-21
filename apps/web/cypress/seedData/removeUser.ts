import { admin } from '../../src/utils/firebase/admin'

const auth = admin.auth()
const db = admin.firestore()

async function run() {
  try {
    const email = process.env.VERSES_E2E_TEST_EMAIL
    if (!email) {
      throw new Error('VERSES_E2E_TEST_EMAIL not set')
    }

    const user = await auth.getUserByEmail(email)
    await auth.deleteUser(user.uid)

    const batch = db.batch()
    const flashcards = await db
      .collection('flashcards')
      .where('owner', '==', user.uid)
      .get()

    flashcards.forEach((doc) => {
      batch.delete(doc.ref)
    })

    await batch.commit()

    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
}

run()
