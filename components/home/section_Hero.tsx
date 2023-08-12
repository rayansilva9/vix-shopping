import { memo, useEffect, useRef, useState } from 'react'
import useElementOnScreen from '../../hooks/useElementOnScreen'
import 'swiper/css'
import 'swiper/css/bundle'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import Image from 'next/image'

const HeroBg: React.FC = () => {
  // const [lazyLoad, setLazyLoad] = useState(false)

  // const imgRef = useRef(null)
  // const options = {
  //   root: null,
  //   rootMargin: '1px',
  //   threshold: 0.2
  // }

  // const isVisibile = useElementOnScreen(options, imgRef)

  // useEffect(() => {
  //   if (isVisibile) {
  //     setTimeout(() => {
  //       setLazyLoad(true)
  //     }, 1100)
  //   }
  // }, [isVisibile])

  return (
    <div style={{ minHeight: '400px', }} className='px-[40px]'>
      <img className='hero relative z-0 mt-3 inline lg:hidden rounded-md' width={500} height={500}  src="/Cartaz promoção mês dos pais moderno azul e branco.webp" alt="" />
      <img className='hero relative z-0 mt-3 hidden lg:inline rounded-2xl w-full' width={500} height={500}  src="/Design sem nome (2).webp" alt="" />
    </div>
  )
}

export default memo(HeroBg)


{/* <div className="flex flex-col items-center justify-start mb-9 " style={{ maxWidth: '100vw', }}>
        <div className="flex justify-center items-center md:items-start w-full h-96">
          <Swiper
            style={{ width: '100%' }}
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}>
            <SwiperSlide>
              <div
                style={{ height: '600px', background: 'red' }}
                className="w-full"
              />
            </SwiperSlide>
            <SwiperSlide>
              <div
                style={{ height: '600px', background: 'blue' }}
                className="w-full"
              />
            </SwiperSlide>
            <SwiperSlide>
              <div
                style={{ height: '600px', background: 'green' }}
                className="w-full"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div> */}
