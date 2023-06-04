import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { getLeaf } from 'verses-shared/data/getLeaf'
import { LeafId } from 'verses-shared/types/Tree'
import { VerseId } from 'verses-shared/types/verse'
import { admin } from '../../../utils/firebase/admin'

export async function GET(
  request: Request,
  { params }: { params: { verseId: LeafId } }
) {
  const headersList = headers()
  const authToken = headersList.get('authorization')
  console.log(authToken)

  const { uid } = await admin.auth().verifyIdToken(authToken)
  console.log('uid', uid)

  return NextResponse.json('ok')

  // return new Response('Not found', {
  //   status: 404,
  // })
}
