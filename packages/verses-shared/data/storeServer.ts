import { Verse } from '../types/verse'
import { WrittenWorkUncompressed } from '../types/written-work'
import Store from './store'
import dataUncompressed from './written-works-uncompressed.json'

const uncompressed = dataUncompressed as WrittenWorkUncompressed[]
export const ServerStore = new Store<Verse>('uncompressed', uncompressed)
