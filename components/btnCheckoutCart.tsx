import React, { ReactNode } from 'react';
import { CartContext } from '../context/cartContext';

type props = {
  children: ReactNode
}

const BtnCheckouCart: React.FC<props> = ({ children }) => {

  const { productCart, variants, itemFormated } = React.useContext(CartContext)



  return (
    <>
      <form
        action={`/api/checkoutCart/${JSON.stringify(itemFormated)}/${JSON.stringify(variants)}`}
        method="POST"
      >
        {children}
      </form>
    </>
  )
}

export default BtnCheckouCart;