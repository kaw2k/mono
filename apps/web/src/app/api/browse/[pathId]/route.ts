import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { getColumns } from 'verses-shared/data/getColumns'
import { PathId } from 'verses-shared/types/Tree'

export async function GET(
  request: Request,
  { params }: { params: { pathId: PathId } }
) {
  const pathId = params.pathId
  const leafs = getColumns(pathId)

  if (leafs) {
    return NextResponse.json(leafs)
  } else {
    return new Response('Not found', {
      status: 404,
    })
  }
}
