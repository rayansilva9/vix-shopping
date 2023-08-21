import React from 'react'
import productProps from '../../@types/productHome'
import { Paper } from '@mui/material'
import Image from 'next/image'
import formatarMoeda from '../../functions/formataMoeda'
import { processLink } from '../../functions/fixLinksImg'
import CustomizedRating from '../rating'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

type props = {
  product: productProps
  rounded?: string
}

const ProductHorizontal: React.FC<props> = ({ product, rounded = '20px' }) => {
  const { i18n } = useTranslation()

  function GET_BY_LANG() {
    switch (i18n.language) {
      case 'pt':
        return product.photos.pt.length > 0 && processLink(product.photos.pt[0])
        break
      case 'en':
        return product.photos.en.length > 0 && processLink(product.photos.en[0])
        break
      case 'es':
        return product.photos.es.length > 0 && processLink(product.photos.es[0])
        break

      default:
        return product.photos.pt.length > 0 && processLink(product.photos.pt[0])
        break
    }
  }

  return (
    <>
      <li className={`cursor-pointer list-none flex-1 min-w-[100%] md:min-w-[auto] `}>
        <Link href={`produto/${product.id!}`}>
          <Paper
            elevation={0}
            sx={{
              mx: 'auto',
              borderRadius: rounded,
              width: { xs: 'calc(100% - 10px)' },
              minWidth: { xs: 'calc(100vw - 6px)', sm: '346px', md: '380px' },
              height: '170px',
              display: 'flex',
              flex: 1,
              alignItems: 'center',
              paddingY: '26px',
              paddingX: { xs: '12px', sm: '12px', md: '18px' },
              gap: '24px'
            }}
          >
            <div className="flex items-center justify-center">
              <Image
                style={{ animation: 'productImg .2s linear' }}
                quality={65}
                height={107}
                width={107}
                src={GET_BY_LANG()}
                alt=""
              />
            </div>
            <div className="flex self-start h-full flex-col">
              <p className="self-start break-words text-sm my-1">{product.name}</p>
              <CustomizedRating mt={0} tamanho={'small'} val={product.rating} />
              <div className="flex flex-col justify-self-end">
                <p className="text-lg font-semibold">
                  R$ {formatarMoeda(product.precos.brl)}
                </p>
                {/* <p className="text-lg font-semibold">
                  R$ {formatarMoeda(product.precos.usd)}
                </p>
                <p className="text-lg font-semibold">
                  R$ {formatarMoeda(product.precos.eur)}
                </p> */}
                <p className="text-sm">em 12{product.inCardBy}x sem juros</p>
              </div>
            </div>
          </Paper>
        </Link>
      </li>
    </>
  )
}

export default ProductHorizontal
