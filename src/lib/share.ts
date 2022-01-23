import { MAX_NUMBER_OF_GUESSES } from '../constants/constants'
import { getGuessStatuses, Word } from './statuses'
import { solutionIndex } from './words'

export const shareStatus = (guesses: Word[]) => {
  const text = 'Szózat ' +
    solutionIndex +
    ' ' +
    guesses.length +
    `/${MAX_NUMBER_OF_GUESSES}\n\n` +
    generateEmojiGrid(guesses) +
    '\n\n' +
    'szozat.miklosdanka.com';
  if (navigator?.share != null) {
    navigator.share({ text });
  }
  if (navigator?.clipboard?.writeText != null) {
    navigator.clipboard.writeText(text)
  }
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
