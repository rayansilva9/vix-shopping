import React from 'react';
import moda_feminina from '../../schemas/moda-feminina';

type props = {

}
const Section_ModaFeminina: React.FC<props> = ({ }) => {
  return (
    <>
      <section className="sct-mais-procurados bg-white flex justify-center w-full flex-col">
        <p className="text-md my-4 md:text-2xl self-center">Moda feminina</p>
        <ul className="w-full md:flex md:justify-evenly md:gap- whitespace-nowrap no-scrollbar overflow-x-scroll">
          {moda_feminina.map((img: { thumb: string; label: string }) => (
            <li className="inline-flex my-4 flex-col items-center pl-7 mx-3">
              <img
                className="rounded-full"
                width=" 92px"
                height="92px"
                src={img.thumb}
                alt="img"
              />
              <p className="">{img.label}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default React.memo(Section_ModaFeminina);