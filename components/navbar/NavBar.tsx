import { AiOutlineHome } from 'react-icons/ai'
import { VscSearch } from 'react-icons/vsc'
import { BsHandbag } from 'react-icons/bs'
import { BsPerson } from 'react-icons/bs'
import Link from 'next/link'

const NavBar: React.FC = () => {
  const item = [
    { link: '/', name: 'Inicio', icons: <AiOutlineHome className="stroke-0 text-2xl" /> },
    { link: '', name: 'Categoria', icons: <VscSearch className="stroke-0 text-2xl" /> },
    { link: '', name: 'Sacola', icons: <BsHandbag className="stroke-0 text-2xl" /> },
    { link: '', name: 'Perfil', icons: <BsPerson className="stroke-0 text-2xl" /> }
  ]

  return (
    <>
      <div
        style={{ boxShadow: '1px -3px 20px 0px rgba(0,0,0,0.38)' }}
        className="sm:hidden w-full h-auto py-1 bg-white fixed z-50 flex justify-around items-center bottom-0 "
      >
        {item.map((item: { name: string, link: string, icons: JSX.Element }) => (
          <Link key={item.name} href={item.link}>
            <div className="flex items-center flex-col">
              {item.icons}
              <p className="text-gray-500">{item.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default NavBar
