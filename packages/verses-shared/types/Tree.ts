import { Id, Opaque } from 'toolbox'

const idSeperator = '@'

export type LeafId = Opaque<Id, 'Leaf Id'>
export const LeafId = (ids: string[]) => ids.join(idSeperator) as LeafId
export const splitLeafId = (id: LeafId) => id.split(idSeperator)

export interface Tree {
  id: string
  path: LeafId
  title?: string
  columnTitle: string
  children?: Tree[]
}

export interface Paragraph {
  type: 'verse' | 'text'
  text: string[]
}

export interface Leaf {
  id: LeafId
  link: string
  text: string[]
  synonyms: string
  translation: string
  purport: Paragraph[]
}

export class TreeClass {
  constructor(
    public id: string,
    public path: LeafId,
    public columnTitle: string,
    public title?: string,
    public children?: TreeClass[]
  ) {}

  static init(tree: Tree): TreeClass {
    return new TreeClass(
      tree.id,
      tree.path,
      tree.columnTitle,
      tree.title,
      tree.children?.map(TreeClass.init)
    )
  }

  async forEachNode(fn: (node: Tree) => Promise<void>) {
    if (!this.isLeaf()) await fn(this)

    const children = this.children || []
    for (let child of children) {
      await child.forEachNode(fn)
    }
  }

  async forEachLeaf(fn: (node: Tree) => Promise<void>) {
    if (this.isLeaf()) await fn(this)

    const children = this.children || []
    const isChapterNode = children[0]?.isLeaf()

    if (isChapterNode) {
      await Promise.all(children.map((child) => child.forEachLeaf(fn)))
    } else {
      const children = this.children || []
      for (let child of children) {
        await child.forEachLeaf(fn)
      }
    }
  }

  toJSON(): Tree {
    return {
      id: this.id,
      path: this.path,
      title: this.title,
      children: this.children?.map((child) => child.toJSON()),
      columnTitle: this.columnTitle,
    }
  }

  numLeaves(): number {
    if (this.isLeaf()) return 1

    return (
      this.children?.reduce((acc, child) => {
        return acc + child.numLeaves()
      }, 0) || 0
    )
  }

  isLeaf(): boolean {
    return !Array.isArray(this.children)
  }
}
