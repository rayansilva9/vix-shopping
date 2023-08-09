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
    <>
      <img className='hero relative z-0 mt-3' height={300} width='100%' src="https://images-submarino.b2w.io/spacey/suba/2023/01/02/VAD23_Destaque_deskcupom2-55f245d1a72e.png" alt="" />
      {/* <Image className='mb-5 lg:w-3/4 lg:mx-auto lg:h-96' alt='banner' width={400} height={400} src='/VAD23_Destaque_mobcupom2-43455a5788eb.webp' /> */}
    </>
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
