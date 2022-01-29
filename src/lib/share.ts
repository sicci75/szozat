import { MAX_NUMBER_OF_GUESSES } from '../constants/constants'
import { getGuessStatuses, Word } from './statuses'
import { solutionIndex, solutionCreator } from './words'

export const shareStatus = async (guesses: Word[], lost: boolean) => {
  const identifier =
    solutionCreator !== undefined
      ? 'saját feladvány: ' + solutionCreator
      : solutionIndex + '. feladvány'
  const text =
    'Szózat ' +
    identifier +
    ' ' +
    (lost ? 'X' : guesses.length) +
    `/${MAX_NUMBER_OF_GUESSES}\n\n` +
    generateEmojiGrid(guesses) +
    '\n\n' +
    window.location.href
  if (navigator?.share != null) {
    await navigator.share({ text })
    return { type: 'share' as const }
  }
  if (navigator?.clipboard?.writeText != null) {
    await navigator.clipboard.writeText(text)
    return { type: 'clipboard' as const }
  }
  throw new Error('No sharing methods are available')
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
