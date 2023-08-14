import React from 'react'
import { processLink } from '../functions/fixLinksImg'
import formatarMoeda from '../functions/formataMoeda'
import { IconButton, Paper } from '@mui/material'
import Link from 'next/link'
import { CartContext } from '../context/cartContext'
import { RxCross1 } from 'react-icons/rx'
import BtnCheckouCart from './btnCheckoutCart'

const CartContent: React.FC = () => {
  const { setOpenCart, setProductCart, openCart, productCart } =
    React.useContext(CartContext)

  function alterarQuantidade(i: number, sinal: string) {
    setProductCart(prev => {
      let listCopy = [...prev] // Cria uma cópia superficial da matriz
      let item = { ...listCopy[i] } // Cria uma cópia superficial do objeto do item
      if (sinal === '+') {
        item.quantity = item.quantity + 1
      } else {
        item.quantity = item.quantity - 1
      }
      listCopy[i] = item
      return listCopy
    })
  }

  function deletarItem(i: number) {
    setProductCart(prev => {
      let listCopy = [...prev] // Cria uma cópia superficial da matriz
      listCopy.splice(i, 1)
      let novaCopia = listCopy
      return novaCopia
    })
  }

  return (
    <div>
      <div
        style={{ transition: 'transform .2s ease-in' }}
        className={`bg-white py-10 px-5 w-screen lg:w-[500px] rounded-lg h-screen lg:h-[calc(100vh-30px)] shadow-2xl fixed right-[-500px] ${openCart && '-translate-x-[500px]'
          } top-1/2 -translate-y-1/2 z-[9999]`}
      >
        <div className="relative flex items-center justify-center w-full">
          <IconButton onClick={() => {
            setOpenCart(false)
          }} className="absolute left-0">
            <RxCross1 />
          </IconButton>
          <p className="text-center text-lg font-semibold">Carrinho</p>
        </div>
        <ul className='overflow-y-scroll no-scrollbar'>
          {productCart.length > 0 ? productCart.map((e, i) => (
            <>
              <li
                className={`relative list-none flex-1 min-w-[100%]`} >
                <Paper
                  elevation={0}
                  sx={{
                    mx: 'auto',
                    // borderRadius: rounded,
                    // width: { xs: 'calc(100% - 10px)', },
                    minWidth: { xs: '50%', sm: '346px', md: '380px' },
                    height: '170px',
                    display: 'flex',
                    flex: 1,
                    alignItems: 'center',
                    paddingY: '26px',
                    paddingX: { xs: '12px', sm: '12px', md: '18px' },
                    gap: '24px'
                  }}
                >
                  <Link href={`/produto/${e.id!}`}>
                    <div className="flex cursor-pointer items-center justify-center">
                      <img
                        style={{ animation: 'productImg .2s linear' }}
                        height={107}
                        width={107}
                        src={processLink(e.photo)}
                        alt=""
                      />
                    </div>
                  </Link>
                  <div className="flex self-start h-full flex-col">
                    <p className="self-start break-words text-sm my-1">{e.name}</p>
                    <div className="flex flex-col justify-self-end">
                      <p className=" my-1 text-sm">R$ {formatarMoeda(e.prico)}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4 my-5">
                          <button
                            className="w-6 h-6 text-lg cursor-pointer bg-slate-200 rounded-full flex items-center justify-center"
                            // disabled={quantidade <= 1 ? true : false}
                            onClick={() => {
                              alterarQuantidade(i, '-')
                            }}
                          >
                            -
                          </button>
                          <p className="text-lg font-medium">{e.quantity}</p>
                          <button
                            className="w-6 h-6 text-lg cursor-pointer bg-slate-200 rounded-full flex items-center justify-center"
                            // disabled={quantidade >= 10 ? true : false}
                            onClick={() => {
                              alterarQuantidade(i, '+')
                            }}
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            deletarItem(i)
                          }}
                          className="text-xs cursor-pointer text-red-500"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                </Paper>
              </li>
            </>
          )) : (
            <p className='text-center mt-10'>Seu carrinho ainda esta vazío</p>
          )}
        </ul>
        <div className="px-5 fixed w-full left-0 right-0 bottom-5">

          <BtnCheckouCart>
            <button
              type="submit"
              className="w-full  cursor-pointer  left-0 hover:bg-[#369e23] transition-colors py-3 bg-[#0BC86D] rounded-md text-lg text-white font-medium"
            >
              <p className="text-md text-center">Finalizar Compra</p>
            </button>
          </BtnCheckouCart>
        </div>
      </div>
    </div>
  )
}

export default CartContent
