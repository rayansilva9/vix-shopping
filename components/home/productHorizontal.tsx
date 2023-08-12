import React from 'react';
import productProps from '../../@types/productHome';
import { Paper } from '@mui/material';
import Image from 'next/image';
import formatarMoeda from '../../functions/formataMoeda';
import { processLink } from '../../functions/fixLinksImg';
import CustomizedRating from '../rating'
import Link from 'next/link';

type props = {
  product: productProps
  rounded?: string
}

const ProductHorizontal: React.FC<props> = ({ product, rounded = '20px' }) => {

  return (
    <>
      <li className={`cursor-pointer list-none flex-1 min-w-[100%] md:min-w-[auto] `}>
        <Link href={`produto/${product.id!}`}>
          <Paper
            elevation={0}
            sx={{
              mx: 'auto',
              borderRadius: rounded,
              width: { xs: 'calc(100% - 10px)', },
              minWidth: { xs: '100%', sm: '346px', md: '380px', },
              // maxWidth: { xs: 'calc(100vw - 10px)', sm: '346px', md: '380px', },
              height: '170px',
              display: 'flex',
              flex: 1,
              alignItems: 'center',
              paddingY: '26px',
              paddingX: { xs: '12px', sm: '12px', md: '18px', },
              gap: '24px',
              // boxShadow: ' rgba(0, 0, 0, 0.25) 0px 3px 10px -5px'

            }}
          >
            <div className="flex items-center justify-center">
              <Image
                style={{ animation: 'productImg .2s linear', }}
                quality={65}
                height={107}
                width={107}
                src={processLink(product.photos[0])} alt="" />
            </div>
            <div className="flex self-start h-full flex-col">
              <p className='self-start break-words text-sm my-1'>{product.name}</p>
              <CustomizedRating mt={0} tamanho={'small'} val={product.rating} />
              <div className="flex flex-col justify-self-end">
                <p className=' my-1 text-sm'>R$ {formatarMoeda(product.precoAvenda)}</p>
                <p className='text-sm'>em 12{product.inCardBy}x sem juros</p>
              </div>
            </div>
          </Paper>
        </Link>
      </li>
    </>
  )
}

export default ProductHorizontal;