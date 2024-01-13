import * as RdxSelect from '@radix-ui/react-select'
import { ChevronDown, ChevronUp, XCircle } from 'lucide-react'

import { cn } from '@app/utils/cn'

interface SelectProps {
  className?: string
  error?: string
  placeholder?: string
  options: {
    id: string
    uf: string
    name: string
  }[]
  value?: string
  onChange?(value: string): void
}

export function CkoSelect({
  className,
  placeholder,
  options,
  error,
  onChange,
  value,
}: SelectProps) {
  function handleSelect(value: string) {
    onChange?.(value)
  }

  return (
    <div>
      <div className="relative">
        <label>{placeholder}</label>

        <RdxSelect.Root value={value} onValueChange={handleSelect}>
          <RdxSelect.Trigger
            className={cn(
              'radix-state-open:bg-gray-50 dark:radix-state-open:bg-gray-900 radix-state-on:bg-gray-50 dark:radix-state-on:bg-gray-900 radix-state-instant-open:bg-gray-50 radix-state-delayed-open:bg-gray-50 group mb-8 mt-1 inline-flex h-[3.5rem] w-full select-none items-center justify-between rounded border-none bg-gy-50 px-6 font-medium text-gy-650 shadow outline-none',

              error && '!border-red-900',
              className,
            )}
          >
            <RdxSelect.Value
              className="placeholder:text-gn-400"
              placeholder="Digite o estado *"
            />

            <RdxSelect.Icon className="absolute right-3 top-1/2 -translate-y-1/2">
              <ChevronDown className="h-6 w-6 text-gray-800" />
            </RdxSelect.Icon>
          </RdxSelect.Trigger>

          <RdxSelect.Portal>
            <RdxSelect.Content className="z-[99] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]">
              <RdxSelect.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-gray-800">
                <ChevronUp />
              </RdxSelect.ScrollUpButton>

              <RdxSelect.Viewport className="p-2">
                {options.map((option) => (
                  <RdxSelect.Item
                    key={option.id}
                    value={option.uf}
                    className="rounded-lg p-2 text-sm text-gray-800 outline-none transition-colors data-[highlighted]:bg-gray-50 data-[state=checked]:font-bold"
                  >
                    <RdxSelect.ItemText>{option.name}</RdxSelect.ItemText>
                  </RdxSelect.Item>
                ))}
              </RdxSelect.Viewport>

              <RdxSelect.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-gray-800">
                <ChevronDown />
              </RdxSelect.ScrollDownButton>
            </RdxSelect.Content>
          </RdxSelect.Portal>
        </RdxSelect.Root>
      </div>

      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-900">
          <XCircle />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  )
}
