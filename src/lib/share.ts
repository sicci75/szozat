import { MAX_NUMBER_OF_GUESSES } from '../constants/constants'
import { getGuessStatuses, Word } from './statuses'
import { solutionIndex } from './words'

export const shareStatus = (guesses: Word[]) => {
  navigator.clipboard.writeText(
    'Szózat ' +
      solutionIndex +
      ' ' +
      guesses.length +
      `/${MAX_NUMBER_OF_GUESSES}\n\n` +
      generateEmojiGrid(guesses)
  )
}

export const generateEmojiGrid = (guesses: Word[]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess)
      return guess
        .map((letter, i) => {
          switch (status[i]) {
            case 'correct':
              return '🟩'
            case 'present':
              return '🟨'
            default:
              return '⬜'
          }
        })
        .join('')
    })
    .join('\n')
}
