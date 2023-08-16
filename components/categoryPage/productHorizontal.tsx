import { Paper, Skeleton } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import formatarMoeda from '../../functions/formataMoeda'
import { processLink } from '../../functions/fixLinksImg'
import Link from 'next/link'

type props = {
  e: any
}

const ProductHorizCategory: React.FC<props> = ({ e }) => {
  const [mouseHover, setMouseHover] = React.useState<boolean>(false)
  const itemRef = React.useRef(null)

  const [currentImg, setcurrentImg] = React.useState<number>(0)

  return (
    <>
      <li className="cursor-pointer flex-1 relative min-w-[50vw] lg:min-w-[auto] list-none max-w-[50%] md:max-w-[200px] ">
        <Link href={`/produto/${e.id!}`}>
          <Paper
            elevation={0}
            sx={{
              minHeight: '434px',
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: '', md: '', lg: '20px' },
              paddingY: '20px',
              paddingX: { xs: '20px', md: '15px' },
              borderRadius: '16px'
            }}
          >
            {e.photos.length == 0 ? (
              <Skeleton variant="rounded" width={194} height={194} animation="wave" />
            ) : currentImg == 0 ? (
              <Image
                quality={65}
                style={{ animation: 'productImg .2s linear' }}
                width={194}
                height={194}
                src={e.photos.length > 0 && processLink(e.photos[0])}
                alt=""
              />
            ) : (
              <Image
                quality={65}
                style={{ animation: 'productImg .5s linear' }}
                width={194}
                height={194}
                src={e.photos.length > 0 && processLink(e.photos[1])}
                alt=""
              />
            )}
            <p className="text-zinc-700 text-xs my-2">{e && e.name}</p>

            <div>
              <div className="">
                <p
                  className="text-gray-600 text-xs my-1"
                  style={{
                    textDecoration: 'line-through',
                    textDecorationThickness: '0.01em'
                  }}
                >
                  R$ 80,81
                </p>
              </div>
              <p className="text-lg font-semibold">R$ {formatarMoeda(e.precos.brl)}</p>
              <p className="text-gray-600 text-xs mt-1">em 12{e.inCardBy}x sem juros</p>
            </div>
          </Paper>
        </Link>
      </li>
    </>
  )
}

export default ProductHorizCategory
