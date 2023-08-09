import React from 'react';
import productProps from '../../@types/productHome';
import Link from 'next/link';
import { Paper, Skeleton } from '@mui/material';
import Image from 'next/image';
import formatarMoeda from '../../functions/formataMoeda';
import { processLink } from '../../functions/fixLinksImg';
import CustomizedRating from '../rating'


// import { Container } from './styles';
type props = {
  product: productProps
}
const ProductHorizontal: React.FC<props> = ({ product }) => {
  return (
    <>
      <Link
        style={{ animation: 'itemProduct 0.3s linear' }}
        href={`produto/${product.id!}`}
      >
        <li className='list-none'>
          <Paper
            elevation={1}
            sx={{
              mx: 'auto',
              borderRadius: '20px',
              width: { xs: 'calc(100% - 10px)', },
              minWidth: { xs: 'calc(100vw - 10px)', sm: '346px', md: '426px', },
              maxWidth: { xs: 'calc(100vw - 10px)', sm: '346px', md: '426px', },
              height: '170px',
              display: 'flex',
              alignItems: 'center',
              paddingY: '26px',
              paddingX: { xs: '12px', sm: '12px', md: '24px', },
              gap: '24px',
              boxShadow: ' rgba(0, 0, 0, 0.25) 0px 3px 10px -5px'

            }}
          >
            <div className="flex items-center justify-center">
              <img width={107} src={processLink(product.photos[0])} alt="" />
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
        </li>
      </Link>

    </>
  )
}

export default ProductHorizontal;