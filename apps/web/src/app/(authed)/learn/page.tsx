import 'server-only'
import React, { useMemo } from 'react'

import { Node, PathId, Tree } from 'verses-shared/types/Tree'
import { getColumns } from 'verses-shared/data/getColumns'

interface BrowseProps {
  params: { slugs: string[] }
}

export default function Browse({ params: { slugs = [] } }: BrowseProps) {
  const path = useMemo(() => PathId(slugs), [slugs])
  const columns = getColumns(path)

  return (
    <>
      <h1>Learn</h1>
    </>
  )
}
