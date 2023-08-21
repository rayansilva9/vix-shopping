import { IconButton, Paper, Skeleton } from '@mui/material'
import React, { useMemo, useState } from 'react'
import productProps from '../../@types/productHome'
import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi'
import ProductVertical from './productVertical'
import { useTranslation } from 'react-i18next'
type props = {
  products: productProps[]
}

const Section_EmAlta: React.FC<props> = ({ products }) => {
  const [positon, setPositon] = useState<number>(0)
  const { t } = useTranslation()
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
      <section className="bg-zinc-100 flex flex-col items-center ">
        <div className="flex flex-col w-full relative pl-8 lg:pl-0 mt-4 mb-7 self-start">
          <p className="text-left text-xl font-normal">{t("main.section hot.title")}</p>
          <div className="w-[90px] h-2 bg-blue-500 rounded-md"></div>
        </div>
        <div className="flex items-center pl-7 w-full overflow-x-scroll no-scrollbar  lg:pl-0">
          <ul className="relative my-5 w-full flex justify-between md:justify-start lg:justify-center lg:px-40 gap-4 md:gap-x-3 gap-y-3">
            <li>
              <IconButton
                aria-label="Prev"
                sx={{
                  display: { xs: 'none', lg: 'inline' },
                  position: 'absolute',
                  left: '10px',
                  top: '150px',
                  fontSize: '40px'
                }}
                onClick={() => {
                  slide('left')
                }}
              >
                <p className="opacity-0 w-0 h-0">Next</p>
                <TfiAngleLeft />
              </IconButton>
            </li>
            {products.length > 0 ? (
              products.slice(positon, positon + 5).map((produtos: productProps, i) => (
                <>
                  <ProductVertical key={i} product={produtos} />
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
            <li>
              <IconButton
                aria-label="Next"
                sx={{
                  display: { xs: 'none', lg: 'inline' },
                  position: 'absolute',
                  right: '10px',
                  top: '150px',
                  fontSize: '40px'
                }}
                onClick={() => {
                  slide('right')
                }}
              >
                <p className="opacity-0 w-0 h-0">Next</p>
                <TfiAngleRight />
              </IconButton>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default React.memo(Section_EmAlta)
