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
    <footer style={{ minHeight: '231px' }} ref={footerRef}>
      {showFooter ? (
        <div style={{ background: '#f8f8f8', }} className='pt-2'>
          <div>
            <p className='text-center font-semibold mb-2'>Nossas redes socias</p>
            <div className='flex justify-center items-center gap-5'>
              <IoLogoInstagram className='text-3xl' />
              <CiFacebook className='text-3xl' />
              <AiFillYoutube className='text-3xl' />
              <AiFillTwitterCircle className='text-3xl' />
              <ImPinterest2 className='text-3xl' />
            </div>
          </div>
          <Divider sx={{ m: '28px 0', }} />
          <div className='flex justify-between md:justify-center md:gap-24 px-2'>
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


/*

  <div className={`${pathname == '/' ? 'mb-0' : pathname.includes('produto') && 'mb-9 md:mb-0'} bg-black w-screen flex py-5 flex-col pl-2 text-white gap-5 items-start justify-center md:mb-0 md:flex-row md:gap-8 `}>
        <div className="flex gap-5">
          <p color="#c7c7c7">Nike </p>
          <img
            loading='lazy'
            width="40px"
            style={{
              filter: 'invert(100%)',
              marginRight: '1rem',
              objectFit: 'contain'
            }}
            src="https://logodownload.org/wp-content/uploads/2014/04/nike-logo-1.png"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-gray-300 font-medium">Empresa</p>
          <p className="text-sm">Sobre nós</p>
          <address>
            <p className="text-sm">Rua Benjamin Constant, Centro, 39</p>
            <p className="text-sm">Cep: 45320-000</p>
          </address>
          <p className="text-sm">CNPJ : XXX.XXX.XXX/XXXX-XX</p>
        </div>
        <div className="flex flex-col">
          <p className="text-gray-300 font-medium">Contato</p>
          <ul className="flex flex-col gap-3">
            <li>
              <a className="text-sm" href="mailto:name@email.com">
                sac@nike.com.br
              </a>
            </li>
            <li>
              <a className="text-xs" href="tel:+5571999999999">
                +55 73 98194-6392
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col">
          <p className="text-gray-300 font-medium">Dúvidas</p>
          <ul className="flex flex-col gap-3">
            <li>
              <a className="text-sm" href="mailto:name@email.com">
                Central de Atendimento
              </a>
            </li>
            <li>
              <a className="text-sm" href="tel:+5571999999999">
                Politica de Devoluçoes
              </a>
            </li>
            <li>
              <a className="text-sm" href="tel:+5571999999999">
                Politica de Reembolso
              </a>
            </li>
            <li>
              <a className="text-sm" href="tel:+5571999999999">
                Politica de Privacidade
              </a>
            </li>
            <li>
              <a className="text-sm" href="tel:+5571999999999">
                Cookies
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-gray-300 font-medium">Redes Socias</p>
          <div className="flex gap-3">
            <a href="mailto:name@email.com">
              <IoLogoInstagram className="text-3xl" />
            </a>
            <a href="mailto:name@email.com">
              <CiFacebook className="text-3xl" />
            </a>
            <a href="mailto:name@email.com">
              <AiFillTwitterCircle className="text-3xl" />
            </a>
          </div>
        </div>
      </div>
*/
