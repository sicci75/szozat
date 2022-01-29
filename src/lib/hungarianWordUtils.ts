import { CHAR_VALUES } from './wordCommons'

const DOUBLE_LETTER_REGEX = /(gy|ly|ny|ty|dzs|dz([^s]|$))/g
const MAYBE_DOUBLE_LETTER_REGEX = /(cs|sz|([^d]|^)zs)/g

export const DOUBLE_LETTERS = [
  { form: 'ddzs', letters: ['dzs', 'dzs'] },
  { form: 'ccs', letters: ['cs', 'cs'] },
  { form: 'ddz', letters: ['dz', 'dz'] },
  { form: 'ggy', letters: ['gy', 'gy'] },
  { form: 'lly', letters: ['ly', 'ly'] },
  { form: 'nny', letters: ['ny', 'ny'] },
  { form: 'ssz', letters: ['sz', 'sz'] },
  { form: 'tty', letters: ['ty', 'ty'] },
  { form: 'zzs', letters: ['zs', 'zs'] },
  { form: 'dzs', letters: ['dzs'] },
  { form: 'cs', letters: ['cs'] },
  { form: 'dz', letters: ['dz'] },
  { form: 'gy', letters: ['gy'] },
  { form: 'ly', letters: ['ly'] },
  { form: 'ny', letters: ['ny'] },
  { form: 'sz', letters: ['sz'] },
  { form: 'ty', letters: ['ty'] },
  { form: 'zs', letters: ['zs'] },
]

export function getWordLetters(rawWord: string) {
  const word = rawWord
    .toUpperCase()
    .split('')
    .filter((char) => CHAR_VALUES.includes(char as any))
    .join('')
    .toLowerCase()
  const letters: string[] = []
  let remainingWord = word
  while (remainingWord.length > 0) {
    const { newLetters, newRemainingWord } = extractNextLetter(remainingWord)
    letters.push(...newLetters)
    remainingWord = newRemainingWord
  }
  return letters
}

export function extractNextLetter(remainingWord: string) {
  for (const doubleLetter of DOUBLE_LETTERS) {
    const result = extractLetter(remainingWord, doubleLetter)
    if (result) {
      return result
    }
  }
  return {
    newLetters: [remainingWord[0]],
    newRemainingWord: remainingWord.substring(1),
  }
}

export function extractLetter(
  remainingWord: string,
  doubleLetter: { form: string; letters: string[] }
) {
  const { form, letters } = doubleLetter
  if (remainingWord.startsWith(form)) {
    return {
      newLetters: letters,
      newRemainingWord: remainingWord.substring(form.length),
    }
  } else {
    return false
  }
}

/**
 * Returns the potential smallest and largest word length, including double letters
 */
export function getWordLengthRange(word: string) {
  const doubleLetters = word.matchAll(DOUBLE_LETTER_REGEX)
  const maybeDoubleLetters = word.matchAll(MAYBE_DOUBLE_LETTER_REGEX)
  const doubleLetterNumber = Array.from(doubleLetters).length
  const maybeDoubleLetterNumber = Array.from(maybeDoubleLetters).length
  const minLength = word.length - doubleLetterNumber - maybeDoubleLetterNumber
  const maxLength = word.length - doubleLetterNumber
  return { minLength, maxLength }
}
