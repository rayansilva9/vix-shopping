import { Divider } from '@mui/material'
import Image from 'next/image'
import { memo, useMemo, useState } from 'react'
import { BiChevronRight } from 'react-icons/bi'
import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi'
import { processLink } from '../../functions/fixLinksImg'
import CustomizedRating from '../rating'
import formatarMoeda from '../../functions/formataMoeda'

interface CustomHTMLUListElement extends HTMLUListElement {
  scrollLeft: number
}

type props = {
  altCurrentImg: string
  currentImg: number
  photos: string[]
  miniImagesRef: React.MutableRefObject<CustomHTMLUListElement>
  scrollMiniImg: (direction: string) => void
  productName: string
  productPrice: number
  productRating: number
  productVariedades: any[]
  productVariedadesOnView: string[]
  MudarVariedade: (index: number, novoValor: string) => void
  setCurrentImg: React.Dispatch<React.SetStateAction<number>>
  setAltCurrentImg: React.Dispatch<React.SetStateAction<string>>
}
const ProductView: React.FC<props> = ({
  altCurrentImg,
  currentImg,
  photos,
  MudarVariedade,
  productName,
  productPrice,
  productRating,
  productVariedades,
  setAltCurrentImg,
  miniImagesRef,
  scrollMiniImg,
  setCurrentImg,
  productVariedadesOnView
}) => {
  const MAGNIFY_SIZE = 200
  const MAGNIFY_SIZE_HALF = MAGNIFY_SIZE / 2

  const [magnifyStyle, setMagnifyStyle] = useState({
    backgroundImage: `url(${altCurrentImg ? altCurrentImg : processLink(photos[currentImg])
      })`
  })

  const handleMouseMove = (e: {
    nativeEvent: { offsetX: any; offsetY: any; target: any }
  }) => {
    const { offsetX, offsetY, target } = e.nativeEvent
    const { offsetWidth, offsetHeight } = target

    const xPercentage = (offsetX / offsetWidth) * 100
    const yPercentage = (offsetY / offsetHeight) * 100

    setMagnifyStyle(prev => ({
      ...prev,
      display: 'block',
      top: `${offsetY - MAGNIFY_SIZE_HALF}px`,
      left: `${offsetX - MAGNIFY_SIZE_HALF}px`,
      backgroundPosition: `${xPercentage}% ${yPercentage}%`
    }))
  }

  const handleMouseLeave = () => {
    setMagnifyStyle(prev => ({ ...prev, display: 'none' }))
  }

  function dividirNomeVariedade(index: number) {
    return productVariedadesOnView[index].split(':')
  }

  useMemo(() => {
    setMagnifyStyle({
      backgroundImage: `url(${altCurrentImg ? altCurrentImg : processLink(photos[currentImg])
        })`
    })
  }, [currentImg, altCurrentImg])

  return (
    <>
      <div
        style={{ boxShadow: ' rgba(0, 0, 0, 0.25) 0px 3px 10px -5px' }}
        className="bg-white w-[94%] md:w-[calc(100vw-216px)]  xl:w-[calc(100vw-216px)] xl:flex xl:py-[10px] mt-6 lg:mt-0 xl:h-[523px]  rounded-xl"
      >
        <div className="lg:px-3">
          <div className="w-full xl:w-[400px]  pt-0 px-0 flex flex-col gap-10">
            <div className="relative flex justify-center items-center">
              <Image
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                style={{ animation: 'itemProduct 0.3s linear' }}
                priority
                placeholder='empty'
                src={altCurrentImg ? altCurrentImg : processLink(photos[currentImg])}
                height={380}
                width={380}
                draggable={false}
                className="rounded-lg md:self-center md:w-[340px] mt-4 lg:w-[380px]"
                alt=""
              />
              <div className="magnify" style={magnifyStyle}>
                {' '}
              </div>
            </div>
            <div className="relative flex flex-col items-center">
              <TfiAngleLeft
                className="absolute hover:bg-[none] -left-[0px] top-[13px]  w-[40px] h-[40px] rounded-full flex items-center justify-center text-[30px]"
                onClick={() => {
                  scrollMiniImg('left')
                }}
              />
              <ul
                ref={miniImagesRef}
                className="w-[300px] left-2 flex pl-6 overflow-x-scroll gap-3 no-scrollbar relative"
              >
                {photos.map((src, i) => (
                  <li
                    onClick={() => {
                      setCurrentImg(i), setAltCurrentImg('')
                    }}
                    className="w-[80px] p-[6px] relative -left-7 flex items-center justify-center"
                    style={{ border: 'pointer' }}
                  >
                    <Image
                      style={{
                        animation: 'itemProduct 0.3s linear',
                        transition: 'border .2s linear',
                        cursor: 'pointer',
                        border: currentImg == i ? ' 1px solid black' : ' 1px solid white'
                      }}
                      loading="eager"
                      className="min-w-[54px] p-1 rounded-md"
                      width={64}
                      height={64}
                      key={i}
                      src={processLink(src)}
                      alt=""
                    />
                  </li>
                ))}
              </ul>

              <TfiAngleRight
                onClick={() => {
                  scrollMiniImg('right')
                }}
                className="text-[30px] absolute -right-[00px] top-[10px]  w-[40px] h-[40px] rounded-full flex items-center justify-center"
              />
            </div>
          </div>
        </div>
        {/* 2 */}
        <div className="mt-1 lg:flex flex-col ">
          <div className="px-3">
            <p className="text-2xl font-medium xl:max-w-[330px] text-gray-600 xl:text-[19px] xl:mb-2">
              {productName}
            </p>
            <Divider className="my-2 w-full lg:w-[330px]" />
            <p className="text-lg text-[#40cd28] font-semibold xl:my-5 xl:text-[20px]">
              R${''}
              <span className="text-[33px] xl:text-[30px] text-[#40cd28]">
                {formatarMoeda(productPrice)}
              </span>
            </p>
            <div className="relative flex flex-col gap-2 w-full bg-zinc-100 rounded-lg my-2 px-3 py-2 xl:py-2">
              <BiChevronRight className="absolute top-3 right-2" />
              <p className="text-sm xl:text-[16px]">Cupom de desconto</p>
              <p className="text-sm xl:text-[16px]">Frete gratis</p>
            </div>
            <div className="flex items-center gap-1">
              <CustomizedRating tamanho={'small'} mt={'1px'} val={productRating} />
              <p className="lg:text-[16px]">{productRating}</p>
              <p className="lg:text-[16px]">| 500+ vendidos</p>
            </div>
            <Divider className="mt-4" />
          </div>
          <div className="px-4 py-2 overflow-y-scroll no-scrollbar flex flex-col justify-end flex-1 gap-4">
            {productVariedades.map(
              (
                opt: {
                  name: string
                  pid: number
                  values: [
                    {
                      image: string
                      name: string
                      propTips: string
                      vid: number
                    }
                  ]
                },
                i
              ) => {
                return (
                  <div className="flex w-full gap-y-2 flex-col">
                    <p className="text-base xl:text-[15px]">
                      <span className="font-light text-gray-500 xl:text-[15px]">
                        {opt.name}
                      </span>
                      {': '}
                      {dividirNomeVariedade(i).length! > 0 && dividirNomeVariedade(i)[1]}
                    </p>
                    <div className="flex justify-start gap-3 flex-wrap">
                      {opt.values.map((e2, i2) => {
                        return (
                          <div
                            onClick={() => {
                              MudarVariedade(i, `${opt.name}: ${e2.name}`)
                            }}
                            className="rounded-sm"
                            style={{
                              border:
                                dividirNomeVariedade(i).length > 0 &&
                                  dividirNomeVariedade(i)[1].trim() == e2.name
                                  ? '2px solid rgb(59 130 246)'
                                  : '0px',
                              cursor: 'pointer'
                            }}
                          >
                            {e2.image ? (
                              <Image
                                onClick={() => {
                                  setAltCurrentImg(processLink(e2.image))
                                }}
                                className="w-[48px] xl:w-[50px] rounded-md border sm:w-[64px] p-1"
                                key={i}
                                width={49}
                                height={49}
                                src={processLink(e2.image)}
                                alt=""
                              />
                            ) : (
                              <div className="flex items-center justify-center border p-2">
                                <p className="text-[13px]">{e2.name}</p>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              }
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(ProductView)
