import React, { ReactNode } from 'react';
import { CartContext } from '../context/cartContext';

type props = {
  children: ReactNode
}

const BtnCheckouCart: React.FC<props> = ({ children }) => {

  const { productCart, variants } = React.useContext(CartContext)


  return (
    <>
      <form
        action={`/api/checkoutCart/${JSON.stringify(productCart)}/${JSON.stringify(variants)}`}
        method="POST"
      >
        {children}
      </form>
    </>
  )
}

export default BtnCheckouCart;