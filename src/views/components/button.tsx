/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ElementType } from 'react'

interface Props {
  text: string
  icon?: ElementType
  disabled?: boolean
  action?: any
}

export const Button = ({ text, icon: Icon, disabled, action }: Props) => {
  return (
    <button
      type="submit"
      className="group mt-5 flex h-[3.5rem] w-full items-center justify-center gap-2 rounded bg-gn-400 px-4 py-2 text-white duration-200 ease-in hover:bg-gn-300 focus:outline-gn-300 disabled:cursor-not-allowed  disabled:bg-gy-600 sm:text-lg"
      disabled={disabled}
      onClick={action}
    >
      {Icon && <Icon size={24} fill="transparent" scale={2} color="white" />}
      <strong>{text}</strong>
    </button>
  )
}
