import { solution } from './words'

export const CHAR_VALUES = [
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
  'M',
  'Ö',
  'Ü',
  'Ó',
  'Ő',
  'Ú',
  'É',
  'Á',
  'Ű',
  'Í',
  'CS',
  'DZ',
  'DZS',
  'GY',
  'LY',
  'NY',
  'SZ',
  'TY',
  'ZS',
] as const

export type CharStatus = 'absent' | 'present' | 'correct'

export type CharValue = (typeof CHAR_VALUES)[number];

export type Word = readonly CharValue[];

export function isCharValue(value: string): value is CharValue {
  return CHAR_VALUES.includes(value as any);
}

export const getStatuses = (
  guesses: Word[]
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {}

  guesses.forEach((word) => {
    word.forEach((letter, i) => {
      if (!solution.includes(letter)) {
        // make status absent
        return (charObj[letter] = 'absent')
      }

      if (letter === solution[i]) {
        //make status correct
        return (charObj[letter] = 'correct')
      }

      if (charObj[letter] !== 'correct') {
        //make status present
        return (charObj[letter] = 'present')
      }
    })
  })

  return charObj
}

export const getGuessStatuses = (guess: Word): CharStatus[] => {
  const solutionCharsTaken = solution.map((_) => false)

  const statuses: CharStatus[] = Array.from(Array(guess.length))

  // handle all correct cases first
  guess.forEach((letter, i) => {
    if (letter === solution[i]) {
      statuses[i] = 'correct'
      solutionCharsTaken[i] = true
      return
    }
  })

  guess.forEach((letter, i) => {
    if (statuses[i]) return

    if (!solution.includes(letter)) {
      // handles the absent case
      statuses[i] = 'absent'
      return
    }

    // now we are left with "present"s
    const indexOfPresentChar = solution.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index]
    )

    if (indexOfPresentChar > -1) {
      statuses[i] = 'present'
      solutionCharsTaken[indexOfPresentChar] = true
      return
    } else {
      statuses[i] = 'absent'
      return
    }
  })

  return statuses
}
