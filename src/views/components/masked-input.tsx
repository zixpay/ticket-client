/* eslint-disable @typescript-eslint/no-explicit-any */
import { XCircle } from 'lucide-react'
import CpfCnpj from '@react-br-forms/cpf-cnpj-mask'
import InputMask, { ReactInputMask } from 'react-input-mask'

import { ComponentProps, forwardRef, useRef } from 'react'
import { cn } from '@app/utils/cn'
import { Controller } from 'react-hook-form'

type Props = ComponentProps<'input'> & {
  name: string
  label: string
  mask?: string
  style?: string
  className?: string
  handleInputFocus?: (name: string) => void
  error?: string
  control?: any
}

export const MaskedInput = forwardRef<HTMLInputElement, Props>(
  ({
    label,
    name,
    id,
    error,
    className,
    style,
    handleInputFocus,
    mask,
    control,
    ...props
  }) => {
    const inputId = id ?? name
    const inputMaskRef = useRef<ReactInputMask | null>(null)

    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-sm sm:text-base',
              props.disabled && 'cursor-not-allowed',
            )}
          >
            {label}:
          </label>
        )}

        {mask === 'document' ? (
          <Controller
            control={control}
            name={name}
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <CpfCnpj
                {...props}
                value={value}
                onChange={onChange}
                onFocus={() => handleInputFocus && handleInputFocus(name)}
                type="text"
                autoComplete="off"
                id={inputId}
                className={cn(
                  'mb-1 mt-1 h-14 w-full rounded border-2 border-transparent bg-gy-50 px-3 font-semibold tracking-wider text-gy-650 shadow outline-none placeholder:font-medium placeholder:tracking-normal placeholder:text-gy-600 focus:border-gn-300',
                  style && style,
                  error && '!border-red-900',
                )}
              />
            )}
          />
        ) : (
          <Controller
            control={control}
            name={name}
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <InputMask
                {...props}
                value={value}
                autoComplete="off"
                onChange={onChange}
                mask={mask || ''}
                maskChar={''}
                id={inputId}
                onFocus={() => handleInputFocus && handleInputFocus(name)}
                className={cn(
                  'mb-1 mt-1 h-14 w-full rounded border-2 border-transparent bg-gy-50 px-3 font-semibold tracking-wider text-gy-650 shadow outline-none placeholder:font-medium placeholder:tracking-normal placeholder:text-gy-600 focus:border-gn-300',
                  style && style,
                  error && '!border-red-900',
                )}
                ref={inputMaskRef}
              />
            )}
          />
        )}

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

MaskedInput.displayName = 'MaskedInput'
