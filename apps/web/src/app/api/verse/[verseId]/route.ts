import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { getLeaf } from 'verses-shared/data/getLeaf'
import { LeafId } from 'verses-shared/types/Tree'
import { VerseId } from 'verses-shared/types/verse'

export async function GET(
  request: Request,
  { params }: { params: { verseId: LeafId } }
) {
  const verseId = params.verseId
  const verse = getLeaf(verseId)

  if (verse) {
    return NextResponse.json(verse)
  } else {
    return new Response('Not found', {
      status: 404,
    })
  }
}
