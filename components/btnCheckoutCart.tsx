import React, { ReactNode } from 'react';
import { CartContext } from '../context/cartContext';

type props = {
  children: ReactNode
}

const BtnCheckouCart: React.FC<props> = ({ children }) => {

  const { productCart } = React.useContext(CartContext)


  return (
    <>
      <form
        action={`/api/checkoutCart/${JSON.stringify(productCart)}`}
        method="POST"
      >
        {children}
      </form>
    </>
  )
}

export default BtnCheckouCart;