import { cn } from '@app/utils/cn'
import { XCircle } from 'lucide-react'
import { forwardRef, type ComponentProps } from 'react'

type Props = ComponentProps<'input'> & {
  name: string
  label: string
  error?: string
  style?: string
  handleInputFocus?: (name: string) => void
}

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      name,
      placeholder,
      error,
      label,
      style,
      className,
      handleInputFocus,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? name
    return (
      <div className={className}>
        <label htmlFor="document" className="text-sm sm:text-base">
          {label}:
        </label>

        <input
          {...props}
          ref={ref}
          name={name}
          autoComplete='off'
          id={inputId}
          onFocus={() => handleInputFocus && handleInputFocus(name)}
          placeholder={placeholder}
          className={cn(
            'mb-1 mt-1 h-14 w-full rounded border-2 border-transparent bg-gy-50 px-3 font-semibold tracking-wider text-gy-650 shadow outline-none placeholder:font-medium placeholder:tracking-normal placeholder:text-gy-600 focus:border-gn-300',
            style && style,
            error && '!border-red-900',
          )}
        />

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
