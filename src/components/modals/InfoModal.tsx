import { Cell } from '../grid/Cell'
import { MAX_NUMBER_OF_GUESSES } from '../../constants/constants'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="Szabályok" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Találd ki a napi szót {MAX_NUMBER_OF_GUESSES} tippből! Minden tipp után
        a négyzetek színe jelzi, hogy mennyire kerültél közel a megoldáshoz.
      </p>

      {/* <div className="flex justify-center mb-1 mt-4"> */}
      <div className="grid grid-cols-5 gap-1 mb-1 mt-4">
        <Cell value="L" status="correct" />
        <Cell value="A" />
        <Cell value="K" />
        <Cell value="Á" />
        <Cell value="S" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Az L betű szerepel a szóban és jó helyen van.
      </p>

      <div className="grid grid-cols-5 gap-1 mb-1 mt-4">
        <Cell value="GY" />
        <Cell value="E" />
        <Cell value="R" status="present" />
        <Cell value="E" />
        <Cell value="K" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Az R betű szerepel a szóban, de nem jó helyen van.
      </p>

      <div className="grid grid-cols-5 gap-1 mb-1 mt-4">
        <Cell value="A" />
        <Cell value="L" />
        <Cell value="SZ" />
        <Cell value="I" status="absent" />
        <Cell value="K" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Az I betű nem szerepel a szóban.
      </p>
    </BaseModal>
  )
}
