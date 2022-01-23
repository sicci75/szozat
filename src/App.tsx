import { InformationCircleIcon } from '@heroicons/react/outline'
import { ChartBarIcon } from '@heroicons/react/outline'
import { useState, useEffect, useRef } from 'react'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import { WinModal } from './components/modals/WinModal'
import { StatsModal } from './components/modals/StatsModal'
import { isWordInWordList, isWinningWord, solution, isWordEqual } from './lib/words'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from './lib/localStorage'
import { CharValue, Word } from './lib/statuses'
import { MAX_NUMBER_OF_GUESSES } from './constants/constants'

function App() {
  const [currentGuess, setCurrentGuess] = useState<Word>([])
  const [isGameWon, setIsGameWon] = useState(false)
  const [isWinModalOpen, setIsWinModalOpen] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [shareComplete, setShareComplete] = useState(false)
  const [guesses, setGuesses] = useState<Word[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded == null) {
      setIsInfoModalOpen(true)
    }
    if (loaded == null || !isWordEqual(loaded.solution, solution)) {
      return []
    }
    if (loaded.guesses.some(guess => isWordEqual(guess, solution))) {
      setIsGameWon(true)
    }
    return loaded.guesses
  })
  const [gridSize, setGridSize] = useState({ width: 0, height: 0 });

  const gridContainerRef = useRef<HTMLDivElement>(null)

  const [stats, setStats] = useState(() => loadStats())

  useEffect(() => {
    const handleResize = () => {
      if (gridContainerRef.current == null) {
        return
      }
      const gridContainerHeight = gridContainerRef.current.clientHeight
      const gridWidth = Math.min(Math.floor(gridContainerHeight * (5 / MAX_NUMBER_OF_GUESSES)), 350)
      const gridHeight = Math.floor(MAX_NUMBER_OF_GUESSES * gridWidth / 5)
      setGridSize({ width: gridWidth, height: gridHeight })
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [setGridSize])

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution })
  }, [guesses])

  useEffect(() => {
    if (isGameWon) {
      setIsWinModalOpen(true)
    }
  }, [isGameWon])

  const onChar = (value: CharValue) => {
    if (currentGuess.length < 5 && guesses.length < MAX_NUMBER_OF_GUESSES) {
      setCurrentGuess([...currentGuess, value])
    }
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  const onEnter = () => {
    if (!(currentGuess.length === 5)) {
      setIsNotEnoughLetters(true)
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, 2000)
    }

    if (!isWordInWordList(currentGuess)) {
      setIsWordNotFoundAlertOpen(true)
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
      }, 2000)
    }

    const winningWord = isWinningWord(currentGuess)

    if (currentGuess.length === 5 && guesses.length < MAX_NUMBER_OF_GUESSES && !isGameWon) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess([])

      if (winningWord) {
        setStats(addStatsForCompletedGame(stats, guesses.length))
        return setIsGameWon(true)
      }

      if (guesses.length === MAX_NUMBER_OF_GUESSES - 1) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameLost(true)
        return setTimeout(() => {
          setIsGameLost(false)
        }, 2000)
      }
    }
  }

  return (
    <>
      <Alert message="Nincs elég betű" isOpen={isNotEnoughLetters} />
      <Alert message="Nem találtunk ilyen szót" isOpen={isWordNotFoundAlertOpen} />
      <Alert
        message={`Vesztettél, a megoldás ez volt: ${solution}`}
        isOpen={isGameLost}
      />
      <Alert
        message="A játékot kimásoltuk a vágólapra"
        isOpen={shareComplete}
        variant="success"
      />
      <WinModal
        isOpen={isWinModalOpen}
        handleClose={() => setIsWinModalOpen(false)}
        guesses={guesses}
        handleShare={() => {
          setIsWinModalOpen(false)
          setShareComplete(true)
          return setTimeout(() => {
            setShareComplete(false)
          }, 2000)
        }}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />
      <StatsModal
        isOpen={isStatsModalOpen}
        handleClose={() => setIsStatsModalOpen(false)}
        gameStats={stats}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => setIsAboutModalOpen(false)}
      />
      <div className="flex flex-col h-[100vh] py-8 w-[100%] max-w-[500px] mx-auto sm:px-6 lg:px-8">
        <div className="flex w-80 mx-auto items-center mb-8">
          <h1 className="text-xl grow font-bold">Szózat</h1>
          <InformationCircleIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => setIsInfoModalOpen(true)}
          />
          <ChartBarIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => setIsStatsModalOpen(true)}
          />
        </div>
        <div ref={gridContainerRef} className="grow flex justify-center items-center overflow-hidden mb-5">
          <Grid guesses={guesses} currentGuess={currentGuess} size={gridSize} />
        </div>
        <div className="pb-5">
          <Keyboard
            onChar={onChar}
            onDelete={onDelete}
            onEnter={onEnter}
            guesses={guesses}
          />
        </div>
      </div>
      <div className="pb-5">
        <button
          type="button"
          className="mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setIsAboutModalOpen(true)}
        >
          A játék eredetéről
        </button>
      </div>
    </>
  )
}

export default App
