import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState
} from 'react'
import { parseCookies } from 'nookies'
import { useTranslation } from 'react-i18next'
type userContextProviderProps = {
  children: ReactNode
}

type userContextProps = {
  setCurrency: Dispatch<SetStateAction<currencyProps>>
  currency: currencyProps
}
type currencyProps = 'brl' | 'usd' | 'eur'

export const CurrencyContext = createContext({} as userContextProps)

export const CurrencyContextProvider: React.FC<userContextProviderProps> = ({
  children
}) => {
  const [currency, setCurrency] = useState<currencyProps>('brl')

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}
