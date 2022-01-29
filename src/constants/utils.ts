import { CharValue, Word } from '../lib/statuses'

export const toWord = (word: string[]): Word => {
  return word.map((letter) => letter.toUpperCase() as CharValue)
}
