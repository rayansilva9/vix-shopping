import { Avatar } from '@mui/material'
import React from 'react'
import { AiFillTwitterCircle, AiFillYoutube, AiOutlineClose } from 'react-icons/ai'
import { UserContext } from '../../context/userContext'
import { IoLogoInstagram } from 'react-icons/io'
import { CiFacebook } from 'react-icons/ci'
import { ImPinterest2 } from 'react-icons/im'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AlertDialogDemo from './alertDialog'
import DialogDemo from './editProfile'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import SelectLang from './selectLang'

interface Props {
  openedMenu: boolean
  funcOpen?: Function
}

const MenuMobile: React.FC<Props> = ({ openedMenu, funcOpen }) => {
  const { user } = React.useContext(UserContext)
  const { t, i18n } = useTranslation()

  const [openCategorys, setopenCategorys] = React.useState(false)
  const pathname = usePathname()

  const Categoys: React.FC = () => {
    return (
      <div
        style={{
          transition: 'transform 3s ease',
          transform: openCategorys ? 'translateX(0vw)' : 'translateX(-100vw)'
        }}
        className="h-screen w-screen fixed left-0 top-0 z-40 bg-white"
      >
        <MdOutlineKeyboardArrowDown
          onClick={() => {
            setopenCategorys(false)
          }}
          style={{
            fontSize: '2.2rem',
            margin: '10px 0 ',
            color: 'black',
            transform: 'rotate(90deg)'
          }}
        />
        <div className="flex flex-col gap-1 px-2">
          {openedMenu && (
            <>
              <div style={{ animation: 'item-menu .4s ease' }} className="py-3 px-2 ">
                <Link
                  className="cursor-pointer"
                  href={'/categoria/Casa-e-Decoração'}
                  onClick={() => {
                    setopenCategorys(false), funcOpen()
                  }}
                >
                  <p
                    style={{
                      fontWeight:
                        decodeURI(pathname) == '/categoria/Casa-e-Decoração'
                          ? '600'
                          : '300'
                    }}
                    className={`relative text-sm text-black `}
                  >
                    {t('header.catergorys.house and decoration')}
                  </p>
                </Link>
              </div>
              <div style={{ animation: 'item-menu .4s ease' }} className="py-3 px-2 ">
                <Link
                  className="cursor-pointer"
                  href={'/categoria/Moda-e-Acessórios'}
                  onClick={() => {
                    setopenCategorys(false), funcOpen()
                  }}
                >
                  <p
                    style={{
                      fontWeight:
                        decodeURI(pathname) == '/categoria/Moda-e-Acessórios'
                          ? '600'
                          : '300'
                    }}
                    className={`relative text-sm text-black`}
                  >
                    {t('header.catergorys.fashion')}
                  </p>
                </Link>
              </div>
              <div style={{ animation: 'item-menu .4s ease' }} className="py-3 px-2 ">
                <Link
                  className="cursor-pointer"
                  href={'/categoria/Beleza-e -Cuidados'}
                  onClick={() => {
                    setopenCategorys(false), funcOpen()
                  }}
                >
                  <p
                    style={{
                      fontWeight:
                        decodeURI(pathname) == '/categoria/Beleza-e -Cuidados'
                          ? '600'
                          : '300'
                    }}
                    className={`relative text-sm text-black`}
                  >
                    {t('header.catergorys.fashion')}
                  </p>
                </Link>
              </div>
              <div style={{ animation: 'item-menu .4s ease' }} className="py-3 px-2 ">
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
                    className={`relative text-sm text-black`}
                  >
                    {t('header.catergorys.electronics and technology')}
                  </p>
                </Link>
              </div>
              <div style={{ animation: 'item-menu .4s ease' }} className="py-3 px-2 ">
                <Link
                  className="cursor-pointer"
                  href={'/categoria/Esportes-e-Lazer'}
                  onClick={() => {
                    setopenCategorys(false), funcOpen()
                  }}
                >
                  <p
                    style={{
                      fontWeight:
                        decodeURI(pathname) == '/categoria/Esportes-e-Lazer'
                          ? '600'
                          : '300'
                    }}
                    className={`relative text-sm text-black`}
                  >
                    {t('header.catergorys.sports and leisure')}
                  </p>
                </Link>
              </div>
              <div style={{ animation: 'item-menu .4s ease' }} className="py-3 px-2 ">
                <Link
                  className="cursor-pointer"
                  href={'/categoria/Saúde-e-Bem-Estar'}
                  onClick={() => {
                    setopenCategorys(false), funcOpen()
                  }}
                >
                  <p
                    style={{
                      fontWeight:
                        decodeURI(pathname) == '/categoria/Saúde-e-Bem-Estar'
                          ? '600'
                          : '300'
                    }}
                    className={`relative text-sm text-black`}
                  >
                    {t('header.catergorys.health and wellness')}
                  </p>
                </Link>
              </div>
              <div style={{ animation: 'item-menu .4s ease' }} className="py-3 px-2 ">
                <Link
                  className="cursor-pointer"
                  href={'/categoria/Cozinha'}
                  onClick={() => {
                    setopenCategorys(false), funcOpen()
                  }}
                >
                  <p
                    style={{
                      fontWeight:
                        decodeURI(pathname) == '/categoria/Cozinha' ? '600' : '300'
                    }}
                    className={`relative text-sm text-black`}
                  >
                    {t('header.catergorys.kitchen')}
                  </p>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        transition: 'all .3s ease',
        transform: openedMenu ? 'translateX(0)' : 'translateX(-100vw)'
      }}
      className="h-screen w-screen fixed left-0 top-0 z-40 bg-white"
    >
      <AiOutlineClose
        onClick={(event: React.MouseEvent) => funcOpen()}
        style={{ fontSize: '2.2rem', margin: '10px 0 ', color: 'black' }}
      />
      <div className="flex flex-col gap-1 px-2">
        {openedMenu && (
          <>
            <Categoys />
            <>
              {user ? (
                <DialogDemo>
                  <div className="flex gap-2 items-center mb-4">
                    <Avatar alt={user && user.username} src={user && user.photo} />
                    <p className="text-black font-semibold">
                      {user ? user.username : 'Entre ou Cadastre-se'}
                    </p>
                  </div>
                </DialogDemo>
              ) : (
                <>
                  <div className="flex gap-2 items-center mb-4">
                    <Avatar src="/emptyImg.jpg" />
                    <p className="text-black font-semibold">
                      {user ? user.username : 'Entre ou Cadastre-se'}
                    </p>
                  </div>
                </>
              )}
            </>
            <SelectLang textColor="text-black" />
            <div style={{ animation: 'item-menu .4s ease' }} className="py-3 px-2 ">
              <Link
                href="/"
                onClick={() => {
                  setopenCategorys(false), funcOpen()
                }}
              >
                <p className="text-black">{t('menuHamburg.home')}</p>
              </Link>
            </div>
            <div style={{ animation: 'item-menu .4s ease' }} className="py-3 px-2 ">
              <p
                onClick={() => {
                  setopenCategorys(true)
                }}
                className="text-black"
              >
                {t('menuHamburg.categorys')}
              </p>
            </div>
            <div style={{ animation: 'item-menu .4s ease' }} className="py-3 px-2 ">
              <p className="text-black">{t('menuHamburg.tracked your product')}</p>
            </div>
            <div style={{ animation: 'item-menu .4s ease' }} className="py-3 px-2 ">
              <p className="text-black mb-4 font-semibold">
                {' '}
                {t('menuHamburg.needHelp?')}
              </p>
              <div className="text-black mb-3">
                <p>(73) 98178-0874</p>
              </div>
              <div className="text-black mb-3">
                <p>SAC (Serviço de Atendimento ao Consumidor)</p>
              </div>
            </div>
            <div style={{ animation: 'item-menu .4s ease' }} className="py-3 px-2 ">
              <p className="text-black mb-4 font-semibold">
                {' '}
                {t('menuHamburg.followUs')}
              </p>
              <div className="text-gray-400 flex gap-2 items-center mb-2">
                <IoLogoInstagram className="text-3xl" />
                <p>Instagram</p>
              </div>
              <div className="text-gray-400 flex gap-2 items-center mb-2">
                <CiFacebook className="text-3xl" />
                <p>Facebook</p>
              </div>
              <div className="text-gray-400 flex gap-2 items-center mb-2">
                <AiFillYoutube className="text-3xl" />
                <p>Youtube</p>
              </div>
              <div className="text-gray-400 flex gap-2 items-center mb-2">
                <AiFillTwitterCircle className="text-3xl" />
                <p>Twitter</p>
              </div>
              <div className="text-gray-400 flex gap-2 items-center mb-2">
                <ImPinterest2 className="text-3xl" />
                <p>Pinterest</p>
              </div>
              {user && (
                <AlertDialogDemo>
                  <div className="text-red-500 flex gap-2 items-center mt-8">
                    <p>{t('menuHamburg.logOff')}</p>
                  </div>
                </AlertDialogDemo>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default React.memo(MenuMobile)
