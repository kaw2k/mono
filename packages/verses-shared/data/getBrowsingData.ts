import { Tree } from '../types/Tree'
import treesJson from './trees.json'

const trees = treesJson as Tree[]

interface ColumnData {
  title: string
  key: string
  basePath: string
  rows: Tree[]
  selected: Tree | null
}

export function getBrowsingColumns(slugs: string[]): ColumnData[] {
  let nodes: ColumnData[] = [
    {
      title: 'Browse',
      key: 'browse',
      rows: trees,
      selected: null,
      basePath: '/browse',
    },
  ]

  let ids = slugs.slice() || []
  const nextId = () => ids.shift()

  const lastColumn = () => nodes[nodes.length - 1]

  let previousRow: Tree | undefined
  let currentId: string | undefined = nextId()
  let currentRow: Tree | undefined = lastColumn().rows.find(
    (r) => r.id === currentId
  )

  while (currentRow) {
    previousRow = currentRow

    nodes.push({
      title: previousRow?.title || '',
      rows: currentRow.children || [],
      selected: currentRow,
      key: previousRow.id,
      basePath: `${lastColumn().basePath}/${previousRow.id}`,
    })

    currentId = nextId()
    currentRow = lastColumn().rows.find((r) => r.id === currentId)
  }

  return nodes
}
