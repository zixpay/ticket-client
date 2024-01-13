import { ScrollDownButton } from '@radix-ui/react-select'
import { ChevronDown } from 'lucide-react'

export const SelectScrollDownButton = () => (
  <ScrollDownButton className="flex cursor-default items-center justify-center bg-white text-gn-400">
    <ChevronDown
      fill="transparent"
      size={34}
      scale={2}
      className="text-gn-400"
    />
  </ScrollDownButton>
)
