import { Word } from '../lib/statuses'
import words from './hungarian-word-letter-list.json'
import { toWord } from './utils'

export const VALIDGUESSES: Word[] = words.map(toWord)
