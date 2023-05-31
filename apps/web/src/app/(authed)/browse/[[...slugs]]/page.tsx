import 'server-only'
import React, { useMemo } from 'react'
import { Column } from './column'
import { Row, RowHeader } from '../row'
import { LeafDetail } from './leafDetail'
import { getBrowsingColumns } from 'verses-shared/data/getBrowsingData'
import { getLeaf } from 'verses-shared/data/getLeaf'
import { LeafId, Tree, splitLeafId } from 'verses-shared/types/Tree'
import { ScrollRight } from './scrollRight'

interface BrowseProps {
  params: { slugs: string[] }
}

export default function Browse({ params: { slugs = [] } }: BrowseProps) {
  const path = useMemo(() => LeafId(slugs), [slugs])
  const columns = getBrowsingColumns(slugs)
  const leaf = getLeaf(path)

  return (
    <>
      <ScrollRight path={path} />
      {columns.map(
        ({ rows, selected, title, basePath }, i) =>
          !!rows.length && (
            <TreeColumn
              rows={rows}
              title={title}
              key={rows.length + selected?.id}
              columnIndex={i}
              basePath={basePath}
            />
          )
      )}

      {leaf && <LeafDetail leaf={leaf} />}
    </>
  )
}

function TreeColumn({
  rows,
  title,
  basePath,
  columnIndex,
}: {
  rows: Tree[]
  columnIndex: number
  title: string
  basePath: string
}) {
  return (
    <Column>
      <RowHeader canGoBack={!!columnIndex}>{title}</RowHeader>
      {rows.map((row) => {
        const nextPath = `${basePath}/${row.id}`
        return (
          <Row key={nextPath} href={nextPath}>
            {row.title || row.id}
          </Row>
        )
      })}
    </Column>
  )
}
