/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Content,
  Group,
  Icon,
  Label,
  Portal,
  Root,
  Separator,
  Trigger,
  Value,
  Viewport,
} from '@radix-ui/react-select'
import { ChevronDown } from 'lucide-react'
import { forwardRef } from 'react'

import { regions, states } from '@/assets/data/states'

import { SelectButton } from '@views/components/select/select-button'
import { SelectItem } from '@views/components/select/select-item'

export const CheckoutSelect: any = forwardRef(
  (props: any, forwardedRef: any) => {
    const { label, onChange, stateSelected, ...restProps } = props

    const getName: any = async (option: string) => {
      const state = states.find((state) => state.uf === option)
      return state?.name
    }

    const stateName = getName(stateSelected)

    return (
      <div>
        <div>
          <label>{label}:</label>
        </div>
        <Root {...restProps} onValueChange={onChange}>
          <Trigger aria-label="States" className="w-full">
            <SelectButton>
              <Value placeholder="Estado:" className="placeholder:text-gn-400">
                {stateName}
              </Value>
              <Icon className="ml-[0.8rem] text-gn-400">
                <ChevronDown
                  size={24}
                  scale={2}
                  className="ml-[0.8rem] text-gn-400"
                />
              </Icon>
            </SelectButton>
          </Trigger>
          <Portal>
            <Content
              ref={forwardedRef}
              className="flex w-full items-center justify-center align-middle"
            >
              <Viewport className=" mb-8 mt-1 w-full max-w-[19rem] rounded border-none bg-white p-2 px-2 shadow">
                {regions.map((region, index) => {
                  return (
                    <Group key={region.id}>
                      <Label className="ml-[0.8rem] w-full font-bold">
                        {region.region}
                      </Label>
                      {states
                        .filter(
                          (state) =>
                            state.cardinalPoints === region.cardinalPoints,
                        )
                        .map((state) => (
                          <SelectItem
                            key={state.id}
                            value={`${state.uf} ${state.name}`}
                            text={`${state.uf} - ${state.name}`}
                            forwardRef={forwardedRef}
                          />
                        ))}
                      {index !== regions.length - 1 && (
                        <Separator className="my-[5px] h-[1px] bg-gn-500" />
                      )}
                    </Group>
                  )
                })}
              </Viewport>
            </Content>
          </Portal>
        </Root>
      </div>
    )
  },
)

CheckoutSelect.displayName = 'CheckoutSelect'
