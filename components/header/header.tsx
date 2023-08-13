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
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from '../../lib/firebase'
import { setCookie } from 'nookies'
import { UserContext } from '../../context/userContext'
import HoverCardDemo from './formCard'


type User = {
  username: string
  email: string
  photo: string
  _id: string
  uid: string
}


const Header2: React.FC = () => {
  const [openMenu, setopenMenu] = React.useState(false)
  const [usuario, setusuario] = useState<User | null>(null);

  const open2 = () => {
    if (openMenu == true) {
      setopenMenu(false)
    } else {
      setopenMenu(true)
    }
  }

  const pathname = usePathname()


  // const CATEGORY = [
  //   { name: 'Casa e Decoração' },
  //   { name: 'Moda e Acessórios' },
  //   { name: 'Beleza e Cuidados Pessoais' },
  //   { name: 'Eletrônicos e Tecnologia' },
  //   { name: 'Esportes e Lazer' },
  //   { name: 'Saúde e Bem-Estar' },
  //   { name: 'Livros, Filmes e Música' },
  //   { name: 'Cozinha' },
  //   { name: 'Jardinagem e Ambiente Externo' },
  //   { name: 'Viagens e Aventuras' },
  // ]
  const provider = new GoogleAuthProvider();

  const AuthFace = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // console.log(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        const usuario = {
          username: user.displayName,
          email: user.email,
          photo: user.photoURL,
          number: user.phoneNumber,
          uid: user.uid,
          doc: '',
        }
        setCookie(undefined, 'US', JSON.stringify(usuario), {
          maxAge: 60 * 60 * 24 * 365 // 1 ano
        })


        try {
          const querySnapshot = await db.collection('users').where('uid', '==', user.uid).get()

          if (!querySnapshot.empty) {
            const res = db.collection('users').where('uid', '==', user.uid).get()
            const doc = (await res).docs.map((e) => ({ ...e.data() }))
            console.log(doc[0]);
            setCookie(undefined, 'US', JSON.stringify(doc[0]), {
              maxAge: 60 * 60 * 24 * 365 // 1 ano
            })
          } else {
            // Nenhum documento com o uid foi encontrado
            const id = await db.collection("users"
            ).add(usuario)
            await db.collection("users"
            ).doc(id.id)
              .update({ doc: id.id, })
            usuario.doc = id.id
            setCookie(undefined, 'US', JSON.stringify(usuario), {
              maxAge: 60 * 60 * 24 * 365 // 1 ano
            })
          }

        } catch (error) {

        }
        // window.reload()


      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  const { setUser, user } = useContext(UserContext)

  useEffect(() => {
    setusuario(user)
  }, [user])

  return (
    <>
      <div className="w-full bg-blue-600 select-none">
        <p className="text-center font-semibold text-sm text-white"> Frete grátis</p>
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
                    <p className="text-xs font-light">Pagamento</p>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <IoPeopleOutline className="text-sm" />{' '}
                    <p className="text-xs font-light">Atendimento</p>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <SiBloglovin className="text-sm" />{' '}
                    <p className="text-xs font-light">Blog</p>
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
                    placeholder="Buscar produtos..."
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
                    <HoverCardDemo  >
                      <div>
                        <Avatar src={usuario.photo} alt="" />
                        <p>{usuario.username}</p>
                      </div>
                    </HoverCardDemo>
                  </div>
                ) : (
                  <div className="cursor-pointer">
                    <p onClick={() => { AuthFace() }}>Entre ou cadastre-se</p>
                  </div>
                )}
                <div className="flex gap-4 text-2xl">
                  <BsSuitHeart className="cursor-pointer hover:text-red-500 transition-colors" />
                  <IoBagHandleOutline className="cursor-pointer" />
                </div>
              </div>
            </div>
            <div className="flex gap-4 px-[108px] mt-5">
              {CATEGORY.map((e, i) => {
                return (
                  <Link key={i} href={'/categoria/' + e.name.replaceAll(' ', '-')}>
                    <p
                      style={{ fontWeight: decodeURI(pathname) == '/categoria/'.concat(e.name.replaceAll(' ', '-')) ? '600' : '300', }}
                      key={i}
                      className={`relative text-sm `}
                    >
                      {e.name}
                    </p>
                  </Link>
                )
              })}
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
                {user == null && (
                  <p onClick={() => { AuthFace() }} className="text-xs font-light">Login</p>
                )}
              </div>

              <div className="flex items-center gap-2 cursor-pointer">
                {' '}

                <div className="flex gap-4 text-xl">
                  <BsSuitHeart />
                  <IoBagHandleOutline />
                </div>
              </div>
            </div>
            <Link href={'/'}>
              <p className=" text-center text-2xl">VIX</p>
            </Link>
            {/* <Stack
              alignItems="center"
              direction="row"
              sx={{
                width: '100%',
                background: '#ededed',
                borderRadius: '5px',
                p: '0 10px'
              }}
            >

              <input
                id="input-src"
                placeholder="Buscar produtos..."
                style={{ background: '#ededed' }}
                className=" w-full rounded-md h-11 placeholder:text-gray-500"
                type="text"
              />
              <BiSearch className="text-2xl" />
            </Stack> */}
          </div>
          <MenuMobile openedMenu={openMenu} funcOpen={open2} />
        </div>
      </header>
    </>
  )
}

export default memo(Header2)
