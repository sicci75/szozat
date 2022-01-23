import { MAX_NUMBER_OF_GUESSES } from '../../constants/constants'
import { Word } from '../../lib/statuses'
import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

type Props = {
  guesses: Word[]
  currentGuess: Word
}

export const Grid = ({ guesses, currentGuess }: Props) => {
  const empties =
    guesses.length < (MAX_NUMBER_OF_GUESSES - 1) ? Array.from(Array(MAX_NUMBER_OF_GUESSES - 1 - guesses.length)) : []

  return (
    <div className="pb-6">
      {guesses.map((guess, i) => (
        <CompletedRow key={i} guess={guess} />
      ))}
      {guesses.length < MAX_NUMBER_OF_GUESSES && <CurrentRow guess={currentGuess} />}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </div>
  )
}
