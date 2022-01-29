import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const AboutModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="A játékról" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-slate-200 pb-2">
        Ez egy nyílt forráskódú, magyar változata a Wordle játéknak.
      </p>
      <p className="text-sm text-gray-500 dark:text-slate-200 pb-2">
        Nézd meg
        {' '}
        <a
          href="https://github.com/mdanka/szozat"
          className="underline font-bold"
        >
          a magyar verzió kódját itt.
        </a>
      </p>
      <p className="text-sm text-gray-500 dark:text-slate-200 pb-2">
        A szólistát
        {' '}
        <a
          href="https://gist.github.com/Konstantinusz/f9517357e46fa827c3736031ac8d01c7"
          className="underline font-bold"
        >
          innen
        </a>
        {' '}
        szereztük.
      </p>
      <p className="text-sm text-gray-500 dark:text-slate-200 pb-2">
        Az angol verzió klónjának
        {' '}
        <a
          href="https://github.com/hannahcode/wordle"
          className="underline font-bold"
        >
          a kódját itt találod.
        </a>
      </p>
      <p className="text-sm text-gray-500 dark:text-slate-200 pb-2">
        Az eredeti játékot pedig
        {' '}
        <a
          href="https://www.powerlanguage.co.uk/wordle/"
          className="underline font-bold"
        >
          itt kipróbálhatod.
        </a>
      </p>
      <p className="text-sm text-gray-500 dark:text-slate-200">
        A magyar verzió tech múzsája <strong>Vőfély Rozi</strong>, a programozói módosításokat
        pedig <strong>Danka Miklós</strong> végezte.
      </p>
    </BaseModal>
  )
}
