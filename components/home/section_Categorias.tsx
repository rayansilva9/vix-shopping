import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CATEGORY } from '../../utils/linksCategoria';

type props = {

}
const Section_Categoria: React.FC<props> = ({ }) => {

  const a = ['', '', '', '', '']


  return (
    <>
      <section className="flex bg-zinc-100 flex-col items-center lg:px-10 2xl:px-[300px] my-12 pl-7">
        <ul className="w-full flex lg:justify-center py-2 lg:gap-14 no-scrollbar overflow-y-hidden overflow-x-scroll">
          {CATEGORY.map((e) => (
            <li className='hover:scale-110 transition-transform'>
              <Link href={'/categoria/' + e.name.replaceAll(' ', '-')}>
                <div className="w-32 flex flex-col justify-center items-center cursor-pointer">
                  <img
                    width={200}
                    height={200}
                    src="https://images-submarino.b2w.io/spacey/suba/2022/07/18/Atalho_APP_Esporte15x-97effe49c77d.png"
                    alt=""
                  />
                  <p className="text-center text-xs">{e.name}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default React.memo(Section_Categoria);