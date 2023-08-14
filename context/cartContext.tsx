import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { parseCookies } from 'nookies'
import productPropsCart from '../@types/productCart'

type cartContextProviderProps = {
  children: ReactNode
}

type cartContextProps = {
  productCart: productPropsCart[]
  setProductCart: React.Dispatch<React.SetStateAction<productPropsCart[]>>
}





export const CartContext = createContext({} as cartContextProps)

export const CartContextProvider: React.FC<cartContextProviderProps> = ({ children }) => {
  const [productCart, setProductCart] = useState<productPropsCart[] | null>([])






  return <CartContext.Provider value={{ productCart, setProductCart }}>{children}</CartContext.Provider>
}