import React, { memo, MutableRefObject, useMemo, useRef, useState } from 'react'
import { IoLogoInstagram } from 'react-icons/io'
import { CiFacebook } from 'react-icons/ci'
import { AiFillTwitterCircle } from 'react-icons/ai'
import { ImPinterest2 } from 'react-icons/im'
import { AiFillYoutube } from 'react-icons/ai'
import { AiFillApple } from 'react-icons/ai'
import { IoLogoGooglePlaystore } from 'react-icons/io5'
import useElementOnScreen from '../../hooks/useElementOnScreen'
import { Divider } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
const Footer: React.FC = () => {
  const { t } = useTranslation()

  const options = {
    root: null,
    rootMargin: '1px 1px 300px 1px',
    threshold: 0.6
  }

  const footerRef: MutableRefObject<any> = useRef<any>(null)
  const [showFooter, setShowFooter] = useState<Boolean>(false)
  const isFooterVisible: Boolean = useElementOnScreen(options, footerRef)

  const pathname = usePathname()

  useMemo(() => {
    if (isFooterVisible) {
      setShowFooter(true)
    }
  }, [isFooterVisible])

  return (
    <footer
      className={`${pathname.includes('produto') ? 'mb-[120px] lg:mb-[0px]' : ''}`}
      ref={footerRef}
      style={{
        minHeight: '231px',
        userSelect: 'none'
      }}
    >
      {showFooter ? (
        <div style={{ background: '#f8f8f8' }} className="pt-2">
          <div className="flex flex-col lg:flex-row justify-between px-4 lg:px-[100px] my-6">
            <div className="my-5">
              <p className="text-xs font-semibold mb-2">
                {t('footer.service.call Center')}
              </p>
              <p className="text-xs mb-1">
                <strong>SAC (Serviço de Atendimento ao Consumidor)</strong>
              </p>
              <p className="text-xs mb-1">
                <strong>E-mail:&nbsp;</strong>suporte@vixshopping.com
              </p>
              <p className="text-xs mb-1">
                <strong> {t('footer.service.onlyWhatsapp')}</strong>
              </p>
              <p className="text-xs mb-1">+55 73 98178-0874</p>
              <p className="text-xs mb-1">
                <strong>{t('footer.service.openingHours')} </strong>
              </p>
              <p className="text-xs mb-1">Seg a Sex: 09:00hs às 18:00hs</p>
              <p className="text-xs mb-1">{t('footer.service.times')}</p>
            </div>
            <div className="my-5">
              <p className="text-sm font-semibold mb-2">{t('footer.ask.title')}</p>
              <Link
                href="/trocas-e-devolucoes"
                className="text-sm hover:underline cursor-pointer block"
              >
                {t('footer.ask.exchanges and returns')}
              </Link>
              <Link
                href="/termos_de_servicos"
                className="text-sm hover:underline cursor-pointer block"
              >
                {t('footer.ask.terms of service')}
              </Link>
              <Link
                href="/politicas-de-privacidade"
                className="text-sm hover:underline cursor-pointer block"
              >
                {t('footer.ask.privacy policy')}
              </Link>
            </div>
          </div>
          <Divider sx={{ m: '28px 0' }} />
          <div className=" flex-col flex lg:flex-row justify-between items-center lg:px-[100px]">
            <div className="text-gray-700">
              <p className="text-center font-semibold  mb-2">
                {' '}
                {t('footer.socialsMidias')}
              </p>
              <div className="flex justify-center items-center gap-5">
                <IoLogoInstagram className="text-3xl" />
                <CiFacebook className="text-3xl" />
                <AiFillYoutube className="text-3xl" />
                <AiFillTwitterCircle className="text-3xl" />
                <ImPinterest2 className="text-3xl" />
              </div>
            </div>
            <Divider sx={{ m: '28px 0' }} />
            <div className="flex justify-between gap-6 md:justify-center md:gap-24 px-2 text-gray-700">
              <div className="flex flex-col items-center ">
                <AiFillApple className="text-2xl" />
                <p className="text-xs lg:text-base">
                  {t('footer.avaliableOnAppStore')}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <IoLogoGooglePlaystore className="text-2xl" />
                <p className="text-xs lg:text-base">
                  {t('footer.avaliableOnGooglePlay')}
                </p>
              </div>
            </div>
          </div>
          <p className="text-xs text-center lg:px-[100px] my-7">
            {t('footer.alert')}
          </p>
          <Divider sx={{ m: '28px 0' }} />
          <div className=" pb-10 pt-2 mt-4">
            <p className="text-center text-xs">
              Rua Benjamin Constant, 39, Centro, CEP:45320-000
            </p>
            <p className="text-center text-xs">CNPJ 90.1239.3090/12321-21</p>
            <p className="text-center text-xs"> {t('footer.label')}</p>
          </div>
        </div>
      ) : null}
    </footer>
  )
}

export default memo(Footer)
