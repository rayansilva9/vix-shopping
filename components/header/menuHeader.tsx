import { Avatar } from '@mui/material'
import React from 'react'
import { AiFillTwitterCircle, AiFillYoutube, AiOutlineClose } from 'react-icons/ai'
import { UserContext } from '../../context/userContext'
import { IoLogoInstagram } from 'react-icons/io'
import { CiFacebook } from 'react-icons/ci'
import { ImPinterest2 } from 'react-icons/im'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { destroyCookie } from 'nookies'
import HoverCardDemo from './formCard'
import AlertDialogDemo from './alertDialog'
import DialogDemo from './editProfile'

interface Props {
  openedMenu: boolean
  funcOpen?: Function
}

const MenuMobile: React.FC<Props> = ({ openedMenu, funcOpen }) => {
  const { setUser, user } = React.useContext(UserContext)

  const [openCategorys, setopenCategorys] = React.useState(false)
  const pathname = usePathname()

  function LogOff() {
    destroyCookie(null, 'US');
    window.location.reload();
  }


  const Categoys: React.FC = () => {

    const CATEGORY = [
      { name: 'Casa e Decoração' },
      { name: 'Moda e Acessórios' },
      { name: 'Beleza e Cuidados Pessoais' },
      { name: 'Eletrônicos e Tecnologia' },
      { name: 'Esportes e Lazer' },
      { name: 'Saúde e Bem-Estar' },
      { name: 'Livros, Filmes e Música' },
      { name: 'Cozinha' },
      { name: 'Jardinagem e Ambiente Externo' },
      { name: 'Viagens e Aventuras' }
    ]

    return (
      <div
        style={{
          transition: 'transform 3s ease',
          transform: openCategorys ? 'translateX(0vw)' : 'translateX(-100vw)'
        }}
        className="h-screen w-screen fixed left-0 top-0 z-40 bg-white"
      >
        <AiOutlineClose
          onClick={() => {
            setopenCategorys(false), funcOpen()
          }}
          style={{ fontSize: '2.2rem', margin: '10px 0 ', color: 'black' }}
        />
        <div className="flex flex-col gap-1 px-2">
          {openedMenu && (
            <>
              {CATEGORY.map((e, i) => {
                return (
                  <div style={{ animation: 'item-menu .4s ease' }} className="py-3 px-2 ">
                    <Link
                      key={i}
                      href={'/categoria/' + e.name.replaceAll(' ', '-')}
                      onClick={() => {
                        setopenCategorys(false),
                          funcOpen()
                      }}
                    >
                      <p
                        style={{
                          fontWeight:
                            decodeURI(pathname) ==
                              '/categoria/'.concat(e.name.replaceAll(' ', '-'))
                              ? '600'
                              : '300'
                        }}
                        key={i}
                        className={`relative text-black `}
                      >
                        {e.name}
                      </p>
                    </Link>
                  </div>
                )
              })}
            </>
          )}
        </div>
      </div >
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
                    <p className="text-black font-semibold">{user ? user.username : 'Entre ou Cadastre-se'}</p>
                  </div>
                </DialogDemo>
              ) : (
                <>
                  <div className="flex gap-2 items-center mb-4">
                    <Avatar src='/emptyImg.jpg' />
                    <p className="text-black font-semibold">{user ? user.username : 'Entre ou Cadastre-se'}</p>
                  </div>
                </>
              )}

            </>

            <div style={{ animation: 'item-menu .4s ease' }} className="py-3 px-2 ">
              <p className="text-black">Home</p>
            </div>
            <div style={{ animation: 'item-menu .4s ease' }} className="py-3 px-2 ">
              <p
                onClick={() => {
                  setopenCategorys(true)
                }}
                className="text-black"
              >
                Categorias
              </p>
            </div>
            <div style={{ animation: 'item-menu .4s ease' }} className="py-3 px-2 ">
              <p className="text-black">Ratreie seu pedido</p>
            </div>
            <div style={{ animation: 'item-menu .4s ease' }} className="py-3 px-2 ">
              <p className="text-black mb-4 font-semibold">Precisa de ajuda?</p>
              <div className="text-black mb-3">
                <p>(73) 98178-0874</p>
              </div>
              <div className="text-black mb-3">
                <p>SAC (Serviço de Atendimento ao Consumidor)</p>
              </div>
            </div>
            <div style={{ animation: 'item-menu .4s ease' }} className="py-3 px-2 ">
              <p className="text-black mb-4 font-semibold">Siga-nos</p>
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
              {
                user && (
                  <AlertDialogDemo>
                    <div className="text-red-500 flex gap-2 items-center mt-8">
                      <p>Encerrar sessâo</p>
                    </div>
                  </AlertDialogDemo>
                )
              }
            </div>
          </>
        )
        }
      </div >
    </div >
  )

  {
    /* <IoLogoInstagram className='text-3xl' />
  <CiFacebook className='text-3xl' />
  <AiFillYoutube className='text-3xl' />
  <AiFillTwitterCircle className='text-3xl' />
  <ImPinterest2 className='text-3xl' /> */
  }
}

export default React.memo(MenuMobile)
