import Link from 'next/link';
import React from 'react';

type props = {

}
const Section_Categoria: React.FC<props> = ({ }) => {

  const a = ['', '', '', '', '']


  return (
    <>
      <section className="flex bg-zinc-100 flex-col items-center lg:px-[300px] my-12  pl-7">
        <ul className="w-full flex lg:justify-center lg:gap-14 no-scrollbar overflow-x-scroll">
          {a.map(() => (
            <li>
              <Link href="category/brinquedo">
                <div className="w-32 flex flex-col justify-center items-center cursor-pointer">
                  <img
                    src="https://images-submarino.b2w.io/spacey/suba/2022/07/18/Atalho_APP_Esporte15x-97effe49c77d.png"
                    alt=""
                  />
                  <p className="text-center">brinquedo</p>
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