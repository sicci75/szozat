import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'

type Props = {
  value?: string
  status?: CharStatus
}

export const Cell = ({ value, status }: Props) => {
  const containerClasses = classnames(
    'grow relative inline-flex justify-center border-solid border-2 rounded before:content-[""] before:block before:pb-[100%]',
    {
      'bg-white dark:bg-orange-100 border-slate-200': !status,
      'border-black dark:border-orange-400': value && !status,
      'bg-slate-400 text-white border-slate-400': status === 'absent',
      'bg-green-500 text-white border-green-500': status === 'correct',
      'bg-yellow-500 text-white border-yellow-500': status === 'present',
      'cell-animation': !!value,
    }
  )

  const classes = classnames(
    'absolute w-[100%] h-[100%] flex items-center justify-center mx-0.5 text-lg font-bold',
  )

  return (
    <div className={containerClasses}>
      <div className={classes}>{value}</div>
    </div>
  )
}
