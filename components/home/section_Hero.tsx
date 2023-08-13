import { memo } from 'react'
import 'swiper/css'
import 'swiper/css/bundle'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import Image from 'next/image'

const HeroBg: React.FC = () => {
  return (
    <div style={{ minHeight: '400px' }} className="lg:px-[40px]">
      <Image
        quality={75}
        style={{ animation: 'productImg .4s ease' }}
        className="hero relative z-0 mt-3 inline lg:hidden rounded-md"
        width={500}
        height={500}
        src="/Cartaz promoção mês dos pais moderno azul e branco.webp"
        alt=""
      />
      <Image
        quality={95}
        style={{ animation: 'productImg .4s ease' }}
        className="hero relative z-0 mt-3 hidden lg:inline rounded-2xl w-full"
        width={500}
        height={500}
        src="/Design sem nome (2).webp"
        alt=""
      />
    </div>
  )
}

export default memo(HeroBg)

{
  /* <div className="flex flex-col items-center justify-start mb-9 " style={{ maxWidth: '100vw', }}>
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
      </div> */
}
