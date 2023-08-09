import { IconButton, Paper, Skeleton } from '@mui/material'
import React, { useMemo, useState } from 'react'
import productProps from '../../@types/productHome'
import Link from 'next/link'
import Image from 'next/image'
import { processLink } from '../../functions/fixLinksImg'
import CustomizedRating from '../rating'
import formatarMoeda from '../../functions/formataMoeda'
import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi'

type props = {
  products: productProps[]
}

const Section_EmAlta: React.FC<props> = ({ products }) => {
  const [positon, setPositon] = useState<number>(0)

  const slide = (direction: string) => {
    if (direction == 'right') {
      setPositon(prev => prev + 5)
    } else {
      setPositon(prev => prev - 5)
    }
  }

  const verify = () => {
    if (positon >= products.length || positon < 0) {
      setPositon(0)
    }
  }

  useMemo(() => {
    verify()
  }, [positon])

  return (
    <>
      <section className="bg-zinc-100 flex flex-col items-center lg:px-[300px]">
        <div className="flex flex-col w-full relative ml-[29px] lg:ml-[0] lg:-left-[140px] mt-4 mb-7 self-start">
          <p className="text-left text-2xl font-normal">Em alta</p>
          <div className="w-[90px] h-2 bg-blue-500 rounded-md"></div>
        </div>
        <div className="flex items-center w-screen overflow-x-scroll no-scrollbar  pl-7 lg:pl-0">
          <ul className="relative my-5 w-full px-[200px] flex justify-between md:justify-start lg:justify-center lg:px-40 gap-4 md:gap-x-6 gap-y-3">
            <IconButton
              onClick={() => {
                slide('left')
              }}
              className="absolute lg:left-11 text-[40px] lg:top-[150px]"
            >
              <TfiAngleLeft />
            </IconButton>
            {products.length > 0 ? (
              products.slice(positon, positon + 5).map((produtos: productProps) => (
                <>
                  <Link
                    style={{ animation: 'itemProduct 0.3s linear' }}
                    href={`produto/${produtos.id!}`}
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
                          boxShadow: ' rgba(0, 0, 0, 0.25) 0px 3px 10px -5px'
                        }}
                      >
                        {produtos.photos.length == 0 ? (
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
                              produtos.photos.length > 0 &&
                              processLink(produtos.photos[0])
                            }
                            alt=""
                          />
                        )}
                        <p className="text-zinc-700 text-md">
                          {produtos && produtos.name}
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
                            R$ {formatarMoeda(produtos.precoAvenda)}
                          </p>
                          <p className="text-zinc-700 text-sm">
                            em {produtos.inCardBy}x sem juros
                          </p>
                        </div>
                      </Paper>
                    </li>
                  </Link>
                </>
              ))
            ) : (
              <>
                <li>
                  <Skeleton
                    style={{ animation: 'itemProduct 0.3s linear' }}
                    variant="rounded"
                    width={224}
                    height={374}
                    animation="wave"
                  />
                </li>
                <li>
                  <Skeleton
                    style={{ animation: 'itemProduct 0.3s linear' }}
                    variant="rounded"
                    width={224}
                    height={374}
                    animation="wave"
                  />
                </li>
                <li>
                  <Skeleton
                    style={{ animation: 'itemProduct 0.3s linear' }}
                    variant="rounded"
                    width={224}
                    height={374}
                    animation="wave"
                  />
                </li>
              </>
            )}
            <IconButton
              onClick={() => {
                slide('right')
              }}
              className="absolute lg:right-11 text-[40px] lg:top-[150px]"
            >
              <TfiAngleRight />
            </IconButton>
          </ul>
        </div>
      </section>
    </>
  )
}

export default React.memo(Section_EmAlta)
