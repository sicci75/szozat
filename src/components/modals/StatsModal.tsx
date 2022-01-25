import { StatBar } from '../stats/StatBar'
import { Histogram } from '../stats/Histogram'
import { GameStats } from '../../lib/localStorage'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
  gameStats: GameStats
}

export const StatsModal = ({ isOpen, handleClose, gameStats }: Props) => {
  return (
    <BaseModal title="Statisztika" isOpen={isOpen} handleClose={handleClose}>
      <StatBar gameStats={gameStats} />
      <h4 className="text-lg leading-6 font-medium text-gray-900">
        A megoldások eloszlása
      </h4>
      <Histogram gameStats={gameStats} />
    </BaseModal>
  )
}
