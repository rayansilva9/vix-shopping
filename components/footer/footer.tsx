import React, { memo, MutableRefObject, useMemo, useRef, useState } from 'react'
import { IoLogoInstagram } from 'react-icons/io'
import { CiFacebook } from 'react-icons/ci'
import { AiFillTwitterCircle } from 'react-icons/ai'
import { ImPinterest2 } from 'react-icons/im'
import { AiFillYoutube } from 'react-icons/ai'
import { AiFillApple } from 'react-icons/ai'
import { IoLogoGooglePlaystore } from 'react-icons/io5'
import { usePathname } from 'next/navigation'
import useElementOnScreen from '../../hooks/useElementOnScreen'
import { Divider } from '@mui/material'

const Footer: React.FC = () => {
  const options = {
    root: null,
    rootMargin: '1px 1px 300px 1px',
    threshold: 0.6
  }

  const footerRef: MutableRefObject<any> = useRef<any>(null)
  const [showFooter, setShowFooter] = useState<Boolean>(false)
  const isFooterVisible: Boolean = useElementOnScreen(options, footerRef)

  useMemo(() => {
    if (isFooterVisible) {
      setShowFooter(true)
    }
  }, [isFooterVisible])

  const pathname = usePathname()

  // const router = useRouter()

  return (
    <footer style={{ minHeight: '231px', userSelect: 'none', }} ref={footerRef}>
      {showFooter ? (
        <div style={{ background: '#f8f8f8', }} className='pt-2'>
          <div className='text-gray-700'>
            <p className='text-center font-semibold  mb-2'>Nossas redes socias</p>
            <div className='flex justify-center items-center gap-5'>
              <IoLogoInstagram className='text-3xl' />
              <CiFacebook className='text-3xl' />
              <AiFillYoutube className='text-3xl' />
              <AiFillTwitterCircle className='text-3xl' />
              <ImPinterest2 className='text-3xl' />
            </div>
          </div>
          <Divider sx={{ m: '28px 0', }} />
          <div className='flex justify-between md:justify-center md:gap-24 px-2 text-gray-700'>
            <div className='flex flex-col items-center'>
              <AiFillApple className='text-2xl' />
              <p className='text-md'>Disponivel na Appstore</p>
            </div>
            <div className='flex flex-col items-center'>
              <IoLogoGooglePlaystore className='text-2xl' />
              <p className='text-md'>Disponivel na Google Play</p>
            </div>
          </div>
          <div className='bg-white pb-10 pt-2 mt-4'>
            <p className='text-center text-xs'>Rua Benjamin Constant, 39, Centro, CEP:45320-000</p>
            <p className='text-center text-xs'>CNPJ 90.1239.3090/12321-21</p>
            <p className='text-center text-xs'>Todos os direitos reservados</p>
          </div>
        </div>
      ) : null
      }
    </footer >
  )
}

export default memo(Footer)

