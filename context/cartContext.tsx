import React, { createContext, ReactNode, useEffect, useState, useMemo } from 'react'
import productPropsCart from '../@types/productCart'
import { db } from '../lib/firebase'
import { UserContext } from './userContext'

type cartContextProviderProps = {
  children: ReactNode
}

type cartContextProps = {
  variants: any
  itemFormated: any
  productCart: productPropsCart[]
  setProductCart: React.Dispatch<React.SetStateAction<productPropsCart[]>>
  openCart: boolean
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>
}


export const CartContext = createContext({} as cartContextProps)

export const CartContextProvider: React.FC<cartContextProviderProps> = ({ children }) => {
  const [productCart, setProductCart] = useState<productPropsCart[] | null>([])
  const [variants, setVariants] = useState({})
  const [openCart, setOpenCart] = useState(false)
  const [dbCart, setDbCart] = useState([])


  const { user } = React.useContext(UserContext)

  const [itemFormated, setItemFormated] = React.useState([]);

  function getPriceAndQuantity() {
    const item = productCart.map((e) => {
      return (
        {
          price: e.price,
          quantity: e.quantity
        }
      )

    })
    setItemFormated(item)
  }

  async function getpost() {

    const res = await db.collection('users').doc(user.doc).get()
    const cart = res.data().cart
    setDbCart(cart)
  }

  useEffect(() => {
    if (user !== null) {
      getpost()
    }
  }, []);

  useMemo(() => {
    if (user !== null) {
      if (dbCart.length > 0) {
        setProductCart(dbCart)
      }
    }
  }, [])

  useMemo(() => {
    if (typeof document !== 'undefined') {
      if (openCart) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'visible';
      }
    }
  }, [openCart])

  useEffect(() => {
    let o = productCart.map((e) => {
      let name = e.name
      let val = e.tipos
      let a = name + ': ' + val
      return (
        { data: a }
      )
    });
    setVariants(prev => {
      return (
        {
          metadata: o.map(item => {
            return { data: item.data };
          })
        }
      )
    })
    getPriceAndQuantity()
  }, [productCart]);



  return <CartContext.Provider value={{ productCart, setProductCart, variants, setOpenCart, openCart, itemFormated }}>{children}</CartContext.Provider>
}