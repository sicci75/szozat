import { useCallback, useState } from 'react'
import { CheckIcon } from '@heroicons/react/outline'
import { MiniGrid } from '../mini-grid/MiniGrid'
import { shareStatus } from '../../lib/share'
import { Word } from '../../lib/statuses'
import { Alert } from '../alerts/Alert'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
  guesses: Word[]
}

export const WinModal = ({
  isOpen,
  handleClose,
  guesses,
}: Props) => {
  const [shareComplete, setShareComplete] = useState(false)
  const [shareFailed, setShareFailed] = useState(false)

  const handleClick = useCallback(async () => {
    try {
      const { type } = await shareStatus(guesses)
      if (type === "clipboard") {
        setShareComplete(true)
        setTimeout(() => {
          setShareComplete(false)
        }, 2000)
      }
    } catch (e) {
      setShareFailed(true)
      setTimeout(() => {
        setShareFailed(false)
      }, 2000)
    }
  }, [guesses])

  return (
    <>
      <Alert
        message="A játékot kimásoltuk a vágólapra"
        isOpen={shareComplete}
        variant="success"
      />
      <Alert
        message="Nem sikerült a megosztás - lehet, hogy beágyazott böngészőt használsz?"
        isOpen={shareFailed}
        variant="warning"
      />
      <BaseModal title="Nyertél!" isOpen={isOpen} handleClose={handleClose}>
        <div>
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <CheckIcon
              className="h-6 w-6 text-green-600"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <div className="mt-2">
              <MiniGrid guesses={guesses} />
              <p className="text-sm text-gray-500">Szép munka!</p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-6">
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            onClick={handleClick}
          >
            Megosztás
          </button>
        </div>
      </BaseModal>
    </>
  )
}
