import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useState,
} from 'react'

interface SellProviderProps {
  children: ReactNode
}

export interface SellContextType {
  sellResponse: boolean | null
  setSellResponse: Dispatch<SetStateAction<boolean | null>>
}

export const SellContext = createContext<SellContextType>({} as SellContextType)

export const SellProvider = ({ children }: SellProviderProps) => {
  const [sellResponse, setSellResponse] = useState<boolean | null>(null)

  return (
    <SellContext.Provider value={{ sellResponse, setSellResponse }}>
      {children}
    </SellContext.Provider>
  )
}
