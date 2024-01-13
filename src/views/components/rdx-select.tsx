import * as Select from '@radix-ui/react-select'
import { ChevronDown, ChevronUp, XCircle } from 'lucide-react'

import { cn } from '@app/utils/cn'

interface Props {
  className?: string
  error?: string
  placeholder: string
  label?: string
  options: number[] | string[]
  onChange(value: string): void
}

export function RdxSelect({
  className,
  placeholder,
  label,
  options,
  error,
  onChange,
}: Props) {
  return (
    <div className="">
      <label htmlFor={placeholder}>{label}:</label>

      <Select.Root onValueChange={onChange}>
        <Select.Trigger
          className={cn(
            'relative mb-2 mt-1 h-14 w-full rounded border bg-gy-50 px-4 text-left font-semibold tracking-wider text-gy-650 shadow outline-none placeholder:font-medium placeholder:tracking-normal placeholder:text-gy-600 focus:border-gn-300',
            error && '!border-red-900',
            className,
          )}
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon className="absolute right-3">
            <ChevronDown className="h-6 w-6 text-gn-400" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="absolute left-0 top-16 z-[99] w-full overflow-hidden rounded border border-gn-300 bg-white shadow ">
            <Select.ScrollUpButton className="flex cursor-default items-center justify-center bg-white text-gn-400">
              <ChevronUp />
            </Select.ScrollUpButton>

            <Select.Viewport className="">
              {options.map((option) => (
                <Select.Item
                  key={option}
                  value={option.toString()}
                  className="text-ce relative px-4 py-2 text-sm text-gy-600 outline-none transition-colors data-[highlighted]:bg-gy-100 data-[state=checked]:font-bold"
                >
                  {/* <Select.ItemIndicator className="absolute inline-flex w-full items-center right-[-60px] top-[5px]">
                    <CheckCheck className='text-gn-400' />
                  </Select.ItemIndicator> */}
                  <Select.ItemText>{option}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>

            <Select.ScrollDownButton className="flex cursor-default items-center justify-center bg-white text-gn-400">
              <ChevronDown />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-900">
          <XCircle />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  )
}
