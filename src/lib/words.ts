import { WORDS } from '../constants/wordlist'
import { VALIDGUESSES } from '../constants/validGuesses'
import { Word } from './statuses'
import { isEqual } from 'lodash'

export const isWordEqual = (word1: Word, word2: Word) => {
  return isEqual(word1, word2)
}

export const isWordInWordList = (word: Word) => {
  return VALIDGUESSES.some((validWord) => isWordEqual(word, validWord))
}

export const isWinningWord = (word: Word) => {
  return isWordEqual(solution, word)
}

export const getWordOfDay = () => {
  // January 1, 2022 Game Epoch
  const epochMs = new Date('January 1, 2022 00:00:00').valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const indexModulo = index % WORDS.length
  const nextday = (index + 1) * msInDay + epochMs

  return {
    solution: WORDS[indexModulo],
    solutionIndex: indexModulo,
    tomorrow: nextday,
  }
}

export const { solution, solutionIndex, tomorrow } = getWordOfDay()
