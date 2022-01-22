import { WORDS } from '../constants/wordlist'
import { VALIDGUESSES } from '../constants/validGuesses'
import { Word } from './statuses'
import { isEqual } from 'lodash'

const isWordEqual = (word1: Word, word2: Word) => {
  return isEqual(word1, word2)
}

export const isWordInWordList = (word: Word) => {
  return VALIDGUESSES.some(validWord => isWordEqual(word, validWord))
}

export const isWinningWord = (word: Word) => {
  return isWordEqual(solution, word)
}

export const getWordOfDay = () => {
  // January 1, 2022 Game Epoch
  const epochMs = 1641013200000
  // const epochMs = new Date("2021-03-04 00:00:00").getDate();
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)

  return {
    solution: WORDS[index],
    solutionIndex: index,
  }
}

export const { solution, solutionIndex } = getWordOfDay()
