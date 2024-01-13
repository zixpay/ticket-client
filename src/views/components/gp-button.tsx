import { type ComponentProps } from 'react'

import { cn } from '@app/utils/cn'

type Props = ComponentProps<'button'>

export const Button = ({ className, ...props }: Props) => {
  return (
    <button
      {...props}
      className={cn(
        'h-13 rounded bg-gn-400 px-4 font-medium text-white shadow transition-all hover:bg-gn-300 active:bg-gn-500 disabled:cursor-not-allowed disabled:bg-gy-600',
        className,
      )}
    >
      {props.children}
    </button>
  )
}
