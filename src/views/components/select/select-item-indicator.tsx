import { ItemIndicator } from '@radix-ui/react-select'
import { CheckCheck } from 'lucide-react'

export const SelectItemIndicator = () => (
  <ItemIndicator className="absolute left-2 inline-flex w-full items-center">
    <CheckCheck
      fill="transparent"
      size={24}
      scale={2}
      className="text-gn-400"
    />
  </ItemIndicator>
)
