import React from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import { IoBagHandleOutline } from 'react-icons/io5'
import { BsSuitHeart } from 'react-icons/bs'
import { BiSearch } from 'react-icons/bi'
import { IoPeopleOutline } from 'react-icons/io5'
import { ImWhatsapp } from 'react-icons/im'
import { MdPayment } from 'react-icons/md'
import { SiBloglovin } from 'react-icons/si'
import MenuMobile from './menuHeader'
import { Stack } from '@mui/material'
import { useRouter } from 'next/navigation'

const Header2: React.FC = () => {
  const [openMenu, setopenMenu] = React.useState(false)
  const [Tchan, setTchan] = React.useState('')

  const open2 = () => {
    if (openMenu == true) {
      setopenMenu(false)
    } else {
      setopenMenu(true)
    }
  }

  const CATEGORY = [
    'Novidades',
    'Feminino',
    'Masculino',
    'Infantil',
    'Beleza',
    'Acessórios',
    'Calçados',
    'Relogios',
    'Esportivo',
    'Moda Praia'
  ]

  const router = useRouter()

  return (
    <header
      style={{
        background: '#ffffff',
        position: 'relative',
        zIndex: 5,
        boxShadow: ' 0px 5px 28px -2px #0000002a',
        borderBottomLeftRadius: ' 40px',
        borderBottomRightRadius: '40px'
      }}
    >
      <div style={{
        borderBottomLeftRadius: ' 20px',
        borderBottomRightRadius: '20px'
      }} className="py-6 bg-blue-500 text-white">
        <div className="hidden lg:inline">
          <div className="w-full flex items-center justify-between px-[108px]  pt-1">
            <div className="text-3xl text-white font-bold">
              <p
                className="cursor-pointer"
                onClick={() => {
                  router.push('/')
                }}
              >
                Logo
              </p>
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
                {/* <div className="flex items-center gap-2 cursor-pointer">
                  <ImWhatsapp className="text-green-800 text-sm" />{' '}
                  <p className="text-xs text-green-800 font-light">Compre pelo whatsapp</p>
                </div> */}
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
                  style={{ background: '#ededed', color: 'black', }}
                  className=" w-full rounded-md h-11"
                  type="text"
                />
                <BiSearch className="text-2xl text-gray-500" />
              </Stack>
            </div>
            <div className="flex items-center gap-8 ">
              <div className="cursor-pointer">
                <p>Entre ou cadastre-se</p>
              </div>
              <div className="flex gap-4 text-2xl">
                <BsSuitHeart className="cursor-pointer hover:text-red-500 transition-colors" />
                <IoBagHandleOutline className="cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="flex gap-4 px-[108px] mt-5">
            {CATEGORY.map(e => {
              return (
                <p
                  onMouseEnter={() => {
                    setTchan('item-header-category')
                  }}
                  onMouseOut={() => {
                    setTchan('')
                  }}
                  className={`relative ${Tchan} font-light`}
                >
                  {e}
                </p>
              )
            })}
          </div>
        </div>
        <div className="lg:hidden flex flex-col gap-2 px-3">
          <div className="flex items-center justify-between">
            <div className="pr-5 md:pr-52">
              <RxHamburgerMenu
                className="bg-blue-500"
                onClick={open2}
                style={{ fontSize: '1.5rem' }}
              />
            </div>
            <p
              onClick={() => {
                router.push('/')
              }}
              className="text-2xl"
            >
              Logo
            </p>
            <div className="flex items-center gap-2 cursor-pointer">
              {' '}
              <p className="hidden md:inline font-light">Entre ou cadastre-se</p>
              <div className="flex gap-4 text-xl">
                <BsSuitHeart />
                <IoBagHandleOutline />
              </div>
            </div>
          </div>
          <Stack
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
              className=" w-full rounded-md h-11"
              type="text"
            />
            <BiSearch className="text-2xl" />
          </Stack>
        </div>
        <MenuMobile openedMenu={openMenu} funcOpen={open2} />
      </div>
    </header>
  )
}

export default Header2
