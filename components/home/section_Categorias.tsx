import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CATEGORY } from '../../utils/linksCategoria'
import { useTranslation } from 'react-i18next'
type props = {}
const Section_Categoria: React.FC<props> = ({}) => {
  const { t } = useTranslation()
  const a = ['', '', '', '', '']

  function GET_STRING(name: string) {
    switch (name) {
      case 'house and decoration':
        return 'header.catergorys.house and decoration'
        break
      case 'fashion':
        return 'header.catergorys.fashion'
        break
      case 'beauty and personal care':
        return 'header.catergorys.beauty and personal care'
        break
      case 'electronics and technology':
        return 'header.catergorys.electronics and technology'
        break
      case 'sports and leisure':
        return 'header.catergorys.sports and leisure'
        break
      case 'health and wellness':
        return 'header.catergorys.health and wellness'
        break
      case 'kitchen':
        return 'header.catergorys.kitchen'
        break
        a
      default:
        break
    }
  }
  return (
    <>
      <section className="flex bg-zinc-100 flex-col items-center lg:px-10 2xl:px-[300px] my-12 pl-7">
        <ul className="w-full flex lg:justify-center py-2 lg:gap-14 no-scrollbar overflow-y-hidden overflow-x-scroll">
          {CATEGORY.map((e, i) => (
            <li className="hover:scale-110 transition-transform">
              <Link href={'/categoria/' + e.link.replaceAll(' ', '-')}>
                <div className="w-32 flex flex-col justify-center items-center cursor-pointer">
                  <img
                    width={200}
                    height={200}
                    src="https://images-submarino.b2w.io/spacey/suba/2022/07/18/Atalho_APP_Esporte15x-97effe49c77d.png"
                    alt=""
                  />
                  <p className="text-center text-xs">{t(`${GET_STRING(e.name)}`)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default React.memo(Section_Categoria)
