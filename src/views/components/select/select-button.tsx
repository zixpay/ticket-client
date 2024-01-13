import { forwardRef, type ComponentProps } from 'react'

type Props = Omit<ComponentProps<'div'>, 'classname'>

export const SelectButton = forwardRef<HTMLDivElement, Props>(
  ({ children, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      className="radix-state-open:bg-gray-50 dark:radix-state-open:bg-gray-900 radix-state-on:bg-gray-50 dark:radix-state-on:bg-gray-900 radix-state-instant-open:bg-gray-50 radix-state-delayed-open:bg-gray-50 group mb-8 mt-1 inline-flex h-[3.5rem] w-full select-none items-center justify-between rounded border-none bg-gy-50 px-6 font-medium text-gy-650 shadow outline-none"
    >
      {children}
    </div>
  ),
)
SelectButton.displayName = 'Button'
