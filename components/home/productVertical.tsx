import React from 'react';
import productProps from '../../@types/productHome';
import Link from 'next/link';
import { Paper, Skeleton } from '@mui/material';
import Image from 'next/image';
import formatarMoeda from '../../functions/formataMoeda';
import { processLink } from '../../functions/fixLinksImg';
import CustomizedRating from '../../components/rating'


type props = {
  product: productProps
}


const ProductVertical: React.FC<props> = ({ product }) => {
  return (
    <>
      <Link
        style={{ animation: 'itemProduct 0.3s linear' }}
        href={`produto/${product.id!}`}
      >
        <li>
          <Paper
            elevation={1}
            sx={{
              minHeight: '434px',
              width: '224px',
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: '', md: '', lg: '20px' },
              paddingY: '20px',
              paddingX: { xs: '20px', md: '15px' },
              borderRadius: '16px',
              boxShadow: ' rgba(0, 0, 0, 0.25) 0px 3px 10px -5px',

            }}
          >
            {product.photos.length == 0 ? (
              <Skeleton
                variant="rounded"
                width={194}
                height={194}
                animation="wave"
              />
            ) : (
              <Image
                width={194}
                height={194}
                src={
                  product.photos.length > 0 &&
                  processLink(product.photos[0])
                }
                alt=""
              />
            )}
            <p className="text-zinc-700 text-md">
              {product && product.name}
            </p>
            <div className="flex gap-1 mb-1">
              <CustomizedRating tamanho={'small'} mt={'-1px'} val={4.6} />
              <p className="text-gray-500 text-xs">202 avaliaçôes</p>
            </div>
            <div>
              <div className="">
                <p
                  className="text-gray-600"
                  style={{
                    textDecoration: 'line-through',
                    textDecorationThickness: '0.01em'
                  }}
                >
                  R$ 80,81
                </p>
              </div>
              <p className="text-lg font-semibold">
                R$ {formatarMoeda(product.precoAvenda)}
              </p>
              <p className="text-zinc-700 text-sm">
                em 12{product.inCardBy}x sem juros
              </p>
            </div>
          </Paper>
        </li>
      </Link>
    </>
  )
}

export default ProductVertical;