import { type Ref } from 'react'
import { Item, ItemText } from '@radix-ui/react-select'

import { SelectItemIndicator } from '@views/components/select/select-item-indicator'

interface Props {
  forwardRef?: Ref<HTMLDivElement> | undefined
  key: string | number
  value: string
  text: string
}

export const SelectItem = ({ forwardRef, value, text }: Props) => (
  <Item
    value={value}
    className="radix-disabled:opacity-50 relative flex w-full select-none items-center px-10 focus:bg-gray-100 focus:outline-none "
    ref={forwardRef}
  >
    <ItemText className="w-full">{text}</ItemText>
    <SelectItemIndicator />
  </Item>
)
