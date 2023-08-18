import { memo, useContext } from 'react'
import { CartContext } from '../../context/cartContext'
import { IconButton } from '@mui/material'
import { BsCartCheck } from 'react-icons/bs'
import { BsCartDashFill } from 'react-icons/bs'

type props = {
  priceId: { brl: string; usd: string; eur: string }
  quantidade: number
  variedade: string[]
  preço: { brl: string; usd: string; eur: string }
  name: string
  id: string
  photo: string
}

function formatarMoeda(valor: number | string) {
  valor = valor + ''
  valor = parseInt(valor.replace(/[\D]+/g, ''))
  valor = valor + ''
  valor = valor.replace(/([0-9]{2})$/g, ',$1')

  if (valor.length > 6) {
    valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2')
  }

  return valor
}

const BtnCheckout: React.FC<props> = ({
  preço,
  priceId,
  quantidade,
  variedade,
  name,
  id,
  photo
}) => {
  const { setProductCart, productCart } = useContext(CartContext)

  return (
    <>
      <form
        method="post"
        action={`/api/checkout/${priceId}/${quantidade}/${variedade.join(', ')}/`}
      >
        <div
          style={{ boxShadow: ' 0px -4px 15px -8px rgba(0,0,0,0.75)' }}
          className=" xl:hidden fixed bg-white bottom-0 w-full px-2 py-4"
        >
          <div className="flex items-center justify-between">
            <p className="text-base text-gray-600 font-bold xl:my-5 xl:text-[20px]">
              R${''}
              <span className="text-2xl xl:text-[30px]">{formatarMoeda(preço.brl)}</span>
            </p>
            <IconButton
              onClick={() => {
                //@ts-ignore
                setProductCart(prev => {
                  return [
                    ...prev,
                    {
                      price: priceId,
                      name: name,
                      prico: preço,
                      tipos: variedade.join(', '),
                      quantity: quantidade,
                      id: id,
                      photo: photo
                    }
                  ]
                })
              }}
              className=""
            >
              <BsCartCheck />
            </IconButton>
          </div>
          <p className="text-zinc-700 text-sm  mb-2">ou 12x sem juros</p>
          <button
            type="submit"
            className="w-full cursor-pointer hover:bg-[#369e23] transition-colors py-3 bg-[#0BC86D] rounded-md text-lg text-white font-medium"
          >
            <p className="text-md text-center">Compra Agora</p>
          </button>
        </div>
      </form>
    </>
  )
}

export default memo(BtnCheckout)
