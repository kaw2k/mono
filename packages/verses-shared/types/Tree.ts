import { Id, Opaque } from 'toolbox'

export type TreeId = Opaque<Id, 'Tree Id'>
export const TreeId = (id: string) => id as TreeId

const idSeperator = '/'
export type PathId = Opaque<Id, 'Leaf Id'>
export const PathId = (ids: string[]) => ids.join(idSeperator) as PathId
export const splitPathId = (id: PathId) => id.split(idSeperator) as TreeId[]

export type Tree = Node | Leaf

export interface Node {
  type: 'chapter' | 'work' | 'book' | 'poem' | 'explore'
  id: TreeId
  path: PathId
  title?: string
  subtitle?: string
  children: (Node | Leaf)[]
}

export interface Leaf {
  type: 'leaf'
  id: TreeId
  path: PathId
  link: string
  text: string[]
  synonyms: string
  translation: string
  purport: {
    type: 'verse' | 'text'
    text: string[]
  }[]
}
