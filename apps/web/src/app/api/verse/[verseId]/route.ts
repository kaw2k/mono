import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { VerseId } from 'verses-shared/types/verse'
import { ServerStore } from 'verses-shared/data/storeServer'

export async function GET(
  request: Request,
  { params }: { params: { verseId: VerseId } }
) {
  const verseId = params.verseId
  const verse = ServerStore.getVerseById(verseId)

  if (verse) {
    return NextResponse.json(verse)
  } else {
    return new Response('Not found', {
      status: 404,
    })
  }
}
