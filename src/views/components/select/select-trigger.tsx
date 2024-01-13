import { Icon, Trigger, Value } from '@radix-ui/react-select'
import { ChevronDown } from 'lucide-react'

import { SelectButton } from '@views/components/select/select-button'

interface Props {
  ariaLabel: string
  placeholder: string
}

export const SelectTrigger = ({ ariaLabel, placeholder }: Props) => (
  <Trigger aria-label={ariaLabel} className="w-full">
    <SelectButton>
      <Value placeholder={placeholder} className="placeholder:text-gn-400" />
      <Icon className="ml-[0.8rem] text-gn-400">
        <ChevronDown size={24} scale={2} className="ml-[0.8rem] text-gn-400" />
      </Icon>
    </SelectButton>
  </Trigger>
)
