import { Word } from '../lib/statuses'
import words from './hungarian-puzzles.json'
import { toWord } from './utils'

export const WORDS: Word[] = words.map(toWord)
