import React, { useState } from 'react'
import productProps from '../../@types/productHome'
import Link from 'next/link'
import { Paper, Skeleton } from '@mui/material'
import Image from 'next/image'
import formatarMoeda from '../../functions/formataMoeda'
import { processLink } from '../../functions/fixLinksImg'
import CustomizedRating from '../../components/rating'
import { useTranslation } from 'react-i18next'
type props = {
  product: productProps
}

const ProductVertical: React.FC<props> = ({ product }) => {
  const [currentImg, setcurrentImg] = useState<number>(0)
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
      <li className="cursor-pointer">
        <Link href={`produto/${product.id!}`}>
          <Paper
            onMouseEnter={() => {
              setcurrentImg(1)
            }}
            onMouseLeave={() => {
              setcurrentImg(0)
            }}
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
              boxShadow: ' rgba(0, 0, 0, 0.25) 0px 3px 10px -5px'
            }}
          >
            {product.photos.pt.length == 0 ? (
              <Skeleton variant="rounded" width={194} height={194} animation="wave" />
            ) : currentImg == 0 ? (
              <Image
                quality={65}
                style={{ animation: 'productImg .2s linear' }}
                width={194}
                height={194}
                src={GET_BY_LANG()}
                alt=""
              />
            ) : (
              <Image
                quality={65}
                style={{ animation: 'productImg .5s linear' }}
                width={194}
                height={194}
                src={GET_BY_LANG()}
                alt=""
              />
            )}
            <p className="text-zinc-700 text-md">{product && product.name}</p>
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
                R$ {formatarMoeda(product.precos.brl)}
              </p>
              {/* <p className="text-lg font-semibold">
                R$ {formatarMoeda(product.precos.usd)}
              </p>
              <p className="text-lg font-semibold">
                R$ {formatarMoeda(product.precos.eur)}
              </p> */}

              <p className="text-zinc-700 text-sm">em 12{product.inCardBy}x sem juros</p>
            </div>
          </Paper>
        </Link>
      </li>
    </>
  )
}

export default ProductVertical
