import Countdown from 'react-countdown'
import { StatBar } from '../stats/StatBar'
import { Histogram } from '../stats/Histogram'
import { GameStats } from '../../lib/localStorage'
import { getShareText, shareStatus } from '../../lib/share'
import { solutionCreator, tomorrow } from '../../lib/words'
import { BaseModal } from './BaseModal'
import { Word } from '../../lib/statuses'
import React, { useCallback } from 'react'
import {
  STATISTICS_TITLE,
  GUESS_DISTRIBUTION_TEXT,
  NEW_WORD_TEXT,
  SHARE_TEXT,
} from '../../constants/strings'

type Props = {
  isOpen: boolean
  handleClose: () => void
  guesses: Word[]
  gameStats: GameStats
  isGameLost: boolean
  isGameWon: boolean
  handleShareCopySuccess: () => void
  handleShareFailure: () => void
}

export const StatsModal = ({
  isOpen,
  handleClose,
  guesses,
  gameStats,
  isGameLost,
  isGameWon,
  handleShareCopySuccess,
  handleShareFailure,
}: Props) => {
  const handleShareClick = useCallback(async () => {
    try {
      const { type } = await shareStatus(guesses, isGameLost)
      if (type === 'clipboard') {
        handleShareCopySuccess()
      }
    } catch (e) {
      handleShareFailure()
    }
  }, [guesses, isGameLost, handleShareCopySuccess, handleShareFailure])

  const renderShareText = useCallback((guesses: Word[], lost: boolean) => {
    const text = getShareText(guesses, lost)
    const rows = text.split('\n')
    return (
      <p className="text-xs text-left pt-5 dark:text-white">
        {rows.map((row, index) => (
          <React.Fragment key={index}>
            {row}
            <br />
          </React.Fragment>
        ))}
      </p>
    )
  }, [])

  return (
    <BaseModal
      title={STATISTICS_TITLE}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <StatBar gameStats={gameStats} />
      {gameStats.totalGames > 0 && (
        <>
          <h4 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
            {GUESS_DISTRIBUTION_TEXT}
          </h4>
          <Histogram gameStats={gameStats} />
          {(isGameLost || isGameWon) && (
            <>
              <div className="mt-5 sm:mt-6 columns-2 dark:text-white">
                {tomorrow && (
                  <div>
                    <h5>{NEW_WORD_TEXT}</h5>
                    <Countdown
                      className="text-lg font-medium text-gray-900 dark:text-gray-100"
                      date={tomorrow}
                      daysInHours={true}
                    />
                  </div>
                )}
                {solutionCreator && (
                  <div className="dark:text-white">
                    <p>
                      A feladvány jeligéje: <strong>{solutionCreator}</strong>
                    </p>
                  </div>
                )}
                <button
                  type="button"
                  className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={handleShareClick}
                >
                  {SHARE_TEXT}
                </button>
              </div>
              <div className="mt-5 sm:mt-6 dark:text-white">
                <p>
                  Ha a megosztás gomb nem működik, másold ki innen az
                  eredményedet:
                </p>
                {renderShareText(guesses, isGameLost)}
              </div>
            </>
          )}
        </>
      )}
    </BaseModal>
  )
}
