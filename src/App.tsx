import {
  InformationCircleIcon,
  ChartBarIcon,
  PlusCircleIcon,
  SunIcon,
} from '@heroicons/react/outline'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import { StatsModal } from './components/modals/StatsModal'
import {
  isWordInWordList,
  isWinningWord,
  solution,
  isWordEqual,
} from './lib/words'
import {
  WORDLE_TITLE,
  WIN_MESSAGES,
  GAME_COPIED_MESSAGE,
  ABOUT_GAME_MESSAGE,
  NOT_ENOUGH_LETTERS_MESSAGE,
  WORD_NOT_FOUND_MESSAGE,
  CORRECT_WORD_MESSAGE,
} from './constants/strings'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from './lib/localStorage'
import { CharValue, Word } from './lib/statuses'
import { MAX_NUMBER_OF_GUESSES } from './constants/constants'
import { CreatePuzzleModal } from './components/modals/CreatePuzzleModal'
import { DOUBLE_LETTERS } from './lib/hungarianWordUtils'

import './App.css'

const ALERT_TIME_MS = 2000

function App() {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  const [currentGuess, setCurrentGuess] = useState<Word>([])
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isCreatePuzzleModalOpen, setIsCreatePuzzleModalOpen] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [shareComplete, setShareComplete] = useState(false)
  const [shareFailed, setShareFailed] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
      ? true
      : false
  )
  const [successAlert, setSuccessAlert] = useState('')
  const [guesses, setGuesses] = useState<Word[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded == null) {
      setIsInfoModalOpen(true)
    }
    if (loaded == null || !isWordEqual(loaded.solution, solution)) {
      return []
    }
    const gameWasWon = loaded.guesses.some((guess) =>
      isWordEqual(guess, solution)
    )
    if (gameWasWon) {
      setIsGameWon(true)
    }
    if (loaded.guesses.length === MAX_NUMBER_OF_GUESSES && !gameWasWon) {
      setIsGameLost(true)
    }
    return loaded.guesses
  })
  const [gridSize, setGridSize] = useState({ width: 0, height: 0 })

  const gridContainerRef = useRef<HTMLDivElement>(null)

  const [stats, setStats] = useState(() => loadStats())

  useEffect(() => {
    const handleResize = () => {
      if (gridContainerRef.current == null) {
        return
      }
      const gridContainerHeight = gridContainerRef.current.clientHeight
      const gridWidth = Math.min(
        Math.floor(gridContainerHeight * (5 / MAX_NUMBER_OF_GUESSES)),
        350
      )
      const gridHeight = Math.floor((MAX_NUMBER_OF_GUESSES * gridWidth) / 5)
      setGridSize({ width: gridWidth, height: gridHeight })
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    setTimeout(handleResize, 500)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [setGridSize])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution })
  }, [guesses])

  useEffect(() => {
    if (isGameWon) {
      setSuccessAlert(
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
      )
      setTimeout(() => {
        setSuccessAlert('')
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }
    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }
  }, [isGameWon, isGameLost])

  const onChar = (value: CharValue) => {
    if (guesses.length >= MAX_NUMBER_OF_GUESSES || isGameWon) {
      return
    }
    const currentGuessLastChar =
      currentGuess.length > 0
        ? currentGuess[currentGuess.length - 1]
        : undefined
    const currentGuessPenultimateChar =
      currentGuess.length > 1
        ? currentGuess[currentGuess.length - 2]
        : undefined
    const potentialDoubleLetter =
      currentGuessLastChar === undefined
        ? undefined
        : `${currentGuessLastChar}${value}`
    const potentialTripleLetter =
      currentGuessLastChar === undefined ||
      currentGuessPenultimateChar === undefined
        ? undefined
        : `${currentGuessPenultimateChar}${currentGuessLastChar}${value}`
    const tripleMatch = DOUBLE_LETTERS.find(
      (doubleLetter) =>
        doubleLetter.form.toUpperCase() === potentialTripleLetter
    )
    const newGuessWithTriple =
      tripleMatch === undefined
        ? undefined
        : ([
            ...currentGuess.slice(0, currentGuess.length - 2),
            ...tripleMatch.letters.map((letter) => letter.toUpperCase()),
          ] as Word)
    if (newGuessWithTriple !== undefined && newGuessWithTriple.length <= 5) {
      setCurrentGuess(newGuessWithTriple)
      return
    }
    const doubleMatch = DOUBLE_LETTERS.find(
      (doubleLetter) =>
        doubleLetter.form.toUpperCase() === potentialDoubleLetter
    )
    const newGuessWithDouble =
      doubleMatch === undefined
        ? undefined
        : ([
            ...currentGuess.slice(0, currentGuess.length - 1),
            ...doubleMatch.letters.map((letter) => letter.toUpperCase()),
          ] as Word)
    if (newGuessWithDouble !== undefined && newGuessWithDouble.length <= 5) {
      setCurrentGuess(newGuessWithDouble)
      return
    }
    const newGuessWithSingle = [...currentGuess, value]
    if (newGuessWithSingle.length <= 5) {
      setCurrentGuess(newGuessWithSingle)
      return
    }
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return
    }
    if (!(currentGuess.length === 5)) {
      setIsNotEnoughLetters(true)
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, ALERT_TIME_MS)
    }

    if (
      !isWordInWordList(currentGuess) &&
      !isWordEqual(currentGuess, solution)
    ) {
      setIsWordNotFoundAlertOpen(true)
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
      }, ALERT_TIME_MS)
    }

    const winningWord = isWinningWord(currentGuess)

    if (
      currentGuess.length === 5 &&
      guesses.length < MAX_NUMBER_OF_GUESSES &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess([])

      if (winningWord) {
        setStats(addStatsForCompletedGame(stats, guesses.length))
        return setIsGameWon(true)
      }

      if (guesses.length === MAX_NUMBER_OF_GUESSES - 1) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameLost(true)
      }
    }
  }

  const handleShareCopySuccess = useCallback(() => {
    setShareComplete(true)
    setTimeout(() => {
      setShareComplete(false)
    }, ALERT_TIME_MS)
  }, [])

  const handleShareFailure = useCallback(() => {
    setShareFailed(true)
    setTimeout(() => {
      setShareFailed(false)
    }, ALERT_TIME_MS)
  }, [])

  return (
    <>
      <Alert message={NOT_ENOUGH_LETTERS_MESSAGE} isOpen={isNotEnoughLetters} />
      <Alert
        message={WORD_NOT_FOUND_MESSAGE}
        isOpen={isWordNotFoundAlertOpen}
      />
      <Alert message={CORRECT_WORD_MESSAGE(solution)} isOpen={isGameLost} />
      <Alert
        message={successAlert}
        isOpen={successAlert !== ''}
        variant="success"
      />
      <Alert
        message={GAME_COPIED_MESSAGE}
        isOpen={shareComplete}
        variant="success"
      />
      <Alert
        message="Nem sikerült a megosztás - lehet, hogy beágyazott böngészőt használsz?"
        isOpen={shareFailed}
        variant="warning"
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />
      <StatsModal
        isOpen={isStatsModalOpen}
        handleClose={() => setIsStatsModalOpen(false)}
        guesses={guesses}
        gameStats={stats}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        handleShareCopySuccess={handleShareCopySuccess}
        handleShareFailure={handleShareFailure}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => setIsAboutModalOpen(false)}
      />
      <CreatePuzzleModal
        isOpen={isCreatePuzzleModalOpen}
        handleClose={() => setIsCreatePuzzleModalOpen(false)}
      />
      <div className="transition-all">
        <div className="flex flex-col h-[100vh] pt-2 w-[100%] max-w-[500px] mx-auto sm:px-6 lg:px-8">
          <div className="flex w-80 mx-auto items-center mb-2">
            <h1 className="text-xl grow font-bold dark:text-white">
              {WORDLE_TITLE}
            </h1>
            <SunIcon
              className="h-6 w-6 cursor-pointer dark:stroke-white"
              onClick={() => handleDarkMode(!isDarkMode)}
            />
            <InformationCircleIcon
              className="h-6 w-6 cursor-pointer dark:stroke-white"
              onClick={() => setIsInfoModalOpen(true)}
            />
            <ChartBarIcon
              className="h-6 w-6 cursor-pointer dark:stroke-white"
              onClick={() => setIsStatsModalOpen(true)}
            />
            <PlusCircleIcon
              className="h-6 w-6 cursor-pointer dark:stroke-white"
              onClick={() => setIsCreatePuzzleModalOpen(true)}
            />
          </div>
          <div
            ref={gridContainerRef}
            className="grow flex justify-center items-center overflow-hidden mb-2"
          >
            <Grid
              guesses={guesses}
              currentGuess={currentGuess}
              size={gridSize}
            />
          </div>
          <div className="pb-2">
            <Keyboard
              onChar={onChar}
              onDelete={onDelete}
              onEnter={onEnter}
              guesses={guesses}
            />
          </div>
        </div>
        <div className="pt-5 pb-5">
          <button
            type="button"
            className="mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 select-none"
            onClick={() => setIsAboutModalOpen(true)}
          >
            {ABOUT_GAME_MESSAGE}
          </button>
        </div>
      </div>
    </>
  )
}

export default App
