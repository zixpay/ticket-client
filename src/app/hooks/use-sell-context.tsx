import { useContext } from 'react'
import { SellContext } from '@app/contexts/sell-context'

export function useSellContext() {
  return useContext(SellContext)
}
