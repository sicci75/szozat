import { getGuessStatuses, Word } from '../../lib/statuses'
import { Cell } from './Cell'

type Props = {
  guess: Word
}

export const CompletedRow = ({ guess }: Props) => {
  const statuses = getGuessStatuses(guess)

  return (
    <div className="flex justify-center mb-1">
      {guess.map((letter, i) => (
        <Cell key={i} value={letter} status={statuses[i]} />
      ))}
    </div>
  )
}
