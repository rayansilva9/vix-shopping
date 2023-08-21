import React, { ReactNode } from 'react'
import { CartContext } from '../context/cartContext'
import { CurrencyContext } from '../context/currencyContext'

type props = {
  children: ReactNode
}

const BtnCheckouCart: React.FC<props> = ({ children }) => {
  const { productCart, variants } = React.useContext(CartContext)
  const { currency } = React.useContext(CurrencyContext)

  function getPriceAndQuantity() {
    const item = productCart.map(e => {
      return {
        price:
          currency == 'brl'
            ? e.pricesId.brl
            : currency == 'usd'
            ? e.pricesId.usd
            : currency == 'eur'
            ? e.pricesId.eur
            : e.pricesId.brl,
        quantity: e.quantity
      }
    })
    return item
  }
  return (
    <>
      <form
        action={`/api/checkoutCart/${JSON.stringify(
          getPriceAndQuantity()
        )}/${JSON.stringify(variants)}`}
        method="POST"
      >
        {children}
      </form>
    </>
  )
}

export default BtnCheckouCart
