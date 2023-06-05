import 'server-only'
import React, { useMemo } from 'react'
import { Column } from './column'
import { Row, RowHeader } from '../row'
import { LeafDetail } from './leafDetail'

import { Node, PathId, Tree } from 'verses-shared/types/Tree'
import { ScrollRight } from './scrollRight'
import { getColumns } from 'verses-shared/data/getColumns'

interface BrowseProps {
  params: { slugs: string[] }
}

export default function Browse({ params: { slugs = [] } }: BrowseProps) {
  const path = useMemo(() => PathId(slugs), [slugs])
  const columns = getColumns(path)

  return (
    <>
      <ScrollRight path={path} />
      {columns.map((tree, i) => {
        return tree.type === 'leaf' ? (
          <LeafDetail leaf={tree} key={tree.path} />
        ) : (
          <TreeColumn tree={tree} key={tree.path} />
        )
      })}
    </>
  )
}

function TreeColumn({ tree }: { tree: Node }) {
  return (
    <Column>
      <RowHeader canGoBack={tree.type !== 'explore'}>
        {tree.title || tree.id}
      </RowHeader>
      {tree.children.map((childTree) => {
        const nextPath = `/browse/${childTree.path}`
        return (
          <Row key={nextPath} href={nextPath}>
            {childTree.type === 'leaf'
              ? childTree.id
              : childTree.title || childTree.id}
          </Row>
        )
      })}
    </Column>
  )
}
