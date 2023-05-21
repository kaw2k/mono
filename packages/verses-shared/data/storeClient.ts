import { VerseCompressed } from '../types/verse'
import { WrittenWorkCompressed } from '../types/written-work'
import Store from './store'
import dataCompressed from './written-works-compressed.json'

const compressed = dataCompressed as WrittenWorkCompressed[]
export const ClientStore = new Store<VerseCompressed>('compressed', compressed)
