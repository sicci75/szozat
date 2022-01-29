import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const AboutModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="A játékról" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-slate-200">
        Ez egy nyílt forráskódú változata a Wordle játéknak -{' '}
        <a
          href="https://github.com/mdanka/szozat"
          className="underline font-bold"
        >
          nézd meg a magyar verzió kódját itt
        </a>
        ,{' '}
        <a
          href="https://github.com/hannahcode/wordle"
          className="underline font-bold"
        >
          az angol verzió eredeti kódját itt
        </a>{' '}
        és{' '}
        <a
          href="https://www.powerlanguage.co.uk/wordle/"
          className="underline font-bold"
        >
          próbáld ki az eredeti játékot itt
        </a>
        .
      </p>
    </BaseModal>
  )
}
