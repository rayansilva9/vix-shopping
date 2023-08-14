import { Paper } from '@mui/material';
import Image from 'next/image';
import React, { SetStateAction, useContext } from 'react';
import formatarMoeda from '../../functions/formataMoeda';
import { processLink } from '../../functions/fixLinksImg';
import Link from 'next/link';
import { CartContext } from '../../context/cartContext';
import productPropsCart from '../../@types/productCart';

type props = {
  e: any
}

const ProductVertCategory: React.FC<props> = ({ e }) => {

  const [mouseHover, setMouseHover] = React.useState<boolean>(false);
  const itemRef = React.useRef(null)

  const { setProductCart, productCart } = useContext(CartContext)


  const addToCart = () => {
    if (productCart !== null) {
      setProductCart((prev: any) => {
        return (
          [...prev, { price: e.priceId, quantity: 1, name: e.name, prico: e.precoAvenda, id: e.id, photo: e.photos[0] }]
        )
      })
    } else {
      setProductCart([{ price: e.priceId, quantity: 1, name: e.name, prico: e.precoAvenda, id: e.id, photo: e.photos[0] }])
    }
  }



  return (
    <>
      <li
        ref={itemRef}
        onMouseEnter={() => { setMouseHover(true) }}
        onMouseLeave={() => { setMouseHover(false) }}
        className={`relative cursor-pointer list-none flex-1 min-w-[100%]`}
      >
        <div style={{ display: mouseHover ? 'inline' : 'none', animation: 'productImg .15s linear', }} className="absolute right-4 top-1/2 transform -translate-y-1/2">
          {e.optVal <= 0 ? (
            <button onClick={() => {
              addToCart()
            }}
              className='bg-blue-500 text-white px-2 py-2 rounded-lg' > Adicionar ao Carrinho</button>
          ) : (
            <Link href={`/produto/${e.id!}`}
              className='bg-blue-500 text-white px-2 py-2 rounded-lg'>Selecionar Variantes</Link>
          )}
        </div>
        <Link href={`/produto/${e.id!}`}>
          <Paper
            elevation={0}
            sx={{
              mx: 'auto',
              // borderRadius: rounded,
              // width: { xs: 'calc(100% - 10px)', },
              minWidth: { xs: '50%', sm: '346px', md: '380px', },
              height: '170px',
              display: 'flex',
              flex: 1,
              alignItems: 'center',
              paddingY: '26px',
              paddingX: { xs: '12px', sm: '12px', md: '18px', },
              gap: '24px',

            }}
          >
            <div className="flex items-center justify-center">
              <Image
                style={{ animation: 'productImg .2s linear', }}
                quality={65}
                height={107}
                width={107}
                src={processLink(e.photos[0])} alt="" />
            </div>
            <div className="flex self-start h-full flex-col">
              <p className='self-start break-words text-sm my-1'>{e.name}</p>
              {/* <CustomizedRating mt={0} tamanho={'small'} val={e.rating} /> */}
              <div className="flex flex-col justify-self-end">
                <p className=' my-1 text-sm'>R$ {formatarMoeda(e.precoAvenda)}</p>
              
              </div>
            </div>
          </Paper>
        </Link>
      </li >
    </>
  )
}

export default ProductVertCategory;