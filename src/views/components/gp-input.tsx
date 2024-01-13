import { XCircle } from 'lucide-react'
import { forwardRef, type ComponentProps } from 'react'

import { cn } from '@app/utils/cn'

type Props = ComponentProps<'input'> & {
  name: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ id, name, placeholder, error, className, ...props }, ref) => {
    const inputId = id ?? name

    return (
      <div className="relative">
        <input
          {...props}
          id={inputId}
          ref={ref}
          name={name}
          placeholder=" "
          className={cn(
            'peer h-[52px] w-full rounded border border-gray-500 bg-white px-3 pt-4 text-gray-800 outline-none transition-all placeholder-shown:pt-0 focus:border-gray-800',
            error && '!border-red-900',
            className,
          )}
        />

        <label
          htmlFor={inputId}
          className="pointer-events-none absolute left-[13px] top-2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base"
        >
          {placeholder}
        </label>

        {error && (
          <div className="mt-2 flex items-center gap-2 text-red-900">
            <XCircle />
            <span className="text-xs">{error}</span>
          </div>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
