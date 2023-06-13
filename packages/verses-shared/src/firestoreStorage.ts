import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
  where,
  query,
  WhereFilterOp,
} from 'firebase/firestore'
import { Storage } from '../types/storage'

type ObjectWithId = { id: string }

export function makeFirebaseStorage<T extends ObjectWithId>(
  collectionName: string,
  whereAll: Parameters<typeof where>
): Storage<T> {
  const db = getFirestore()

  return {
    get: async (id: string) => {
      const docRef = doc(db, collectionName, id)
      const docSnap = await getDoc(docRef)
      return docSnap.data() as T
    },
    put: async (id: string, item: T) => {
      const docRef = doc(db, collectionName, id)
      await setDoc(docRef, item, { merge: true })
      return item
    },
    post: async (item: T) => {
      const docRef = doc(db, collectionName, item.id)
      await setDoc(docRef, item)
      return item
    },
    delete: async (id: string) => {
      const docRef = doc(db, collectionName, id)
      await deleteDoc(docRef)
    },
    all: async () => {
      const { docs } = await getDocs(
        query(collection(db, collectionName), where(...whereAll))
      )
      return docs.map((doc) => doc.data() as T)
    },
    query: async (filters) => {
      const { docs } = await getDocs(
        query(
          collection(db, collectionName),
          ...filters.map(([key, opt, val]) => where(key as string, opt, val))
        )
      )
      return docs.map((doc) => doc.data() as T)
    },
  }
}
