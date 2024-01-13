import { ScrollUpButton } from '@radix-ui/react-select'
import { ChevronUp } from 'lucide-react'

export const SelectScrollUpButton = () => (
  <ScrollUpButton className="align-right flex justify-center">
    <ChevronUp fill="transparent" size={34} scale={2} className="text-gn-400" />
  </ScrollUpButton>
)
