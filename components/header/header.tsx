import React, { useContext, useState, useEffect, memo } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import { IoBagHandleOutline } from 'react-icons/io5'
import { BsSuitHeart } from 'react-icons/bs'
import { BiSearch } from 'react-icons/bi'
import { IoPeopleOutline } from 'react-icons/io5'
import { MdPayment } from 'react-icons/md'
import { SiBloglovin } from 'react-icons/si'
import MenuMobile from './menuHeader'
import { Avatar, Stack } from '@mui/material'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { CATEGORY } from '../../utils/linksCategoria'
import { UserContext } from '../../context/userContext'
import HoverCardDemo from './formCard'
import BtnCheckouCart from '../btnCheckoutCart'
import { CartContext } from '../../context/cartContext'
import { AuthGoogle } from '../../hooks/AuthGoogle'
import { useTranslation } from 'react-i18next'
import SelectLang from './selectLang'

type User = {
  username: string
  email: string
  photo: string
  _id: string
  uid: string
}

const Header2: React.FC = () => {
  const [openMenu, setopenMenu] = React.useState(false)
  const [usuario, setusuario] = useState<User | null>(null)

  const open2 = () => {
    if (openMenu == true) {
      setopenMenu(false)
    } else {
      setopenMenu(true)
    }
  }

  const pathname = usePathname()
  const { t, i18n } = useTranslation()
  const { user } = useContext(UserContext)
  const { productCart, setOpenCart } = useContext(CartContext)

  useEffect(() => {
    setusuario(user)
  }, [user])

  return (
    <>
      <div className="w-full bg-blue-600 select-none">
        <p className="text-center font-semibold text-sm text-white">
          {' '}
          {t('header.utils.flagHeader')}
        </p>
      </div>
      <header
        style={{
          userSelect: 'none',
          background: '#ffffff',
          position: 'relative',
          zIndex: 5,
          boxShadow: ' 0px 5px 28px -2px #0000002a',
          borderBottomLeftRadius: ' 40px',
          borderBottomRightRadius: '40px'
        }}
      >
        <div
          style={{
            borderBottomLeftRadius: ' 20px',
            borderBottomRightRadius: '20px'
          }}
          className="py-6 px-4 bg-blue-500 text-white"
        >
          <div className="hidden lg:inline">
            <div className="w-full flex items-center justify-between px-[108px]  pt-1">
              <div className="text-3xl text-white font-bold">
                <Link href={'/'}>
                  <p className="cursor-pointer relative top-3">VIX</p>
                </Link>
              </div>
              <div className="flex gap-2 md:flex-col">
                <div className="flex gap-5">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <MdPayment className="text-sm" />{' '}
                    <p className="text-xs font-light">{t('header.utils.payment')}</p>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <IoPeopleOutline className="text-sm" />{' '}
                    <p className="text-xs font-light">{t('header.utils.service')}</p>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <SiBloglovin className="text-sm" />{' '}
                    <p className="text-xs font-light">{t('header.utils.blog')}</p>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <SelectLang />
                  </div>
                </div>
                <Stack
                  className="shadow-sm"
                  alignItems="center"
                  direction="row"
                  sx={{
                    width: { md: '500px' },
                    background: '#ededed',
                    borderRadius: '5px',
                    p: '0 10px'
                  }}
                >
                  <input
                    placeholder={t('header.input.placeholder')}
                    style={{ background: '#ededed', color: 'black' }}
                    className=" w-full rounded-md h-11 placeholder:text-gray-500"
                    type="text"
                  />
                  <BiSearch className="text-2xl text-gray-500" />
                </Stack>
              </div>
              <div className="flex items-center gap-8  relative top-3 ">
                {usuario !== null ? (
                  <div className="">
                    <HoverCardDemo>
                      <div>
                        <Avatar src={decodeURIComponent(usuario.photo)} alt="" />
                        <p>{usuario.username}</p>
                      </div>
                    </HoverCardDemo>
                  </div>
                ) : (
                  <div className="cursor-pointer">
                    <button onClick={() => AuthGoogle()}>Login</button>
                  </div>
                )}
                <div className="flex gap-4 text-2xl">
                  <BsSuitHeart className="cursor-pointer hover:text-red-500 transition-colors" />
                  {/* <BtnCheckouCart> */}
                  <>
                    <div
                      className={`cartCounter ${
                        productCart.length == 0 ? 'hidden' : 'flex'
                      }`}
                    >
                      {productCart.length}
                    </div>
                    <button
                      onClick={() => {
                        setOpenCart(true)
                      }}
                    >
                      <IoBagHandleOutline className=" cursor-pointer  " />
                    </button>
                  </>
                  {/* </BtnCheckouCart> */}
                </div>
              </div>
            </div>
            <div className="flex gap-4 px-[108px] mt-5">
              <Link className="cursor-pointer" href={'/categoria/Casa-e-Decoração'}>
                <p
                  style={{
                    fontWeight:
                      decodeURI(pathname) == '/categoria/Casa-e-Decoração' ? '600' : '300'
                  }}
                  className={`relative text-sm `}
                >
                  {t('header.catergorys.house and decoration')}
                </p>
              </Link>
              <Link className="cursor-pointer" href={'/categoria/Moda-e-Acessórios'}>
                <p
                  style={{
                    fontWeight:
                      decodeURI(pathname) == '/categoria/Moda-e-Acessórios'
                        ? '600'
                        : '300'
                  }}
                  className={`relative text-sm `}
                >
                  {t('header.catergorys.fashion')}
                </p>
              </Link>
              <Link className="cursor-pointer" href={'/categoria/Beleza-e -Cuidados'}>
                <p
                  style={{
                    fontWeight:
                      decodeURI(pathname) == '/categoria/Beleza-e -Cuidados'
                        ? '600'
                        : '300'
                  }}
                  className={`relative text-sm `}
                >
                  {t('header.catergorys.fashion')}
                </p>
              </Link>
              <Link
                className="cursor-pointer"
                href={'/categoria/Eletrônicos-e-Tecnologia'}
              >
                <p
                  style={{
                    fontWeight:
                      decodeURI(pathname) == '/categoria/Eletrônicos-e-Tecnologia'
                        ? '600'
                        : '300'
                  }}
                  className={`relative text-sm `}
                >
                  {t('header.catergorys.electronics and technology')}
                </p>
              </Link>
              <Link className="cursor-pointer" href={'/categoria/Esportes-e-Lazer'}>
                <p
                  style={{
                    fontWeight:
                      decodeURI(pathname) == '/categoria/Esportes-e-Lazer' ? '600' : '300'
                  }}
                  className={`relative text-sm `}
                >
                  {t('header.catergorys.sports and leisure')}
                </p>
              </Link>
              <Link className="cursor-pointer" href={'/categoria/Saúde-e-Bem-Estar'}>
                <p
                  style={{
                    fontWeight:
                      decodeURI(pathname) == '/categoria/Saúde-e-Bem-Estar'
                        ? '600'
                        : '300'
                  }}
                  className={`relative text-sm `}
                >
                  {t('header.catergorys.health and wellness')}
                </p>
              </Link>
              <Link className="cursor-pointer" href={'/categoria/Cozinha'}>
                <p
                  style={{
                    fontWeight:
                      decodeURI(pathname) == '/categoria/Cozinha' ? '600' : '300'
                  }}
                  className={`relative text-sm `}
                >
                  {t('header.catergorys.kitchen')}
                </p>
              </Link>
            </div>
          </div>
          <div className="lg:hidden flex flex-col gap-0 px-3">
            <div className="flex items-center justify-between">
              <div className="flex gap-4 items-center pr-5 md:pr-52">
                <RxHamburgerMenu
                  className="bg-blue-500"
                  onClick={open2}
                  style={{ fontSize: '1.5rem' }}
                />
                {user == null && <button onClick={() => AuthGoogle()}>Login</button>}
              </div>

              <div className="flex items-center gap-2 cursor-pointer">
                {' '}
                <div className="flex gap-4 text-xl">
                  <BsSuitHeart />
                  <>
                    <div
                      className={`cartCounterSm ${
                        productCart.length == 0 ? 'hidden' : 'flex'
                      }`}
                    >
                      {productCart.length}
                    </div>
                    <button
                      onClick={() => {
                        setOpenCart(true)
                      }}
                      className=""
                    >
                      <IoBagHandleOutline className=" cursor-pointer  " />
                    </button>
                  </>
                </div>
              </div>
            </div>
            <Link href={'/'}>
              <p className=" text-center text-2xl">VIX</p>
            </Link>
          </div>
          <MenuMobile openedMenu={openMenu} funcOpen={open2} />
        </div>
      </header>
    </>
  )
}

export default memo(Header2)
