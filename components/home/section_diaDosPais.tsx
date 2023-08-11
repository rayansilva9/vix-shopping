import React from 'react';
import productProps from '../../@types/productHome';
import ProductHorizontal from './productHorizontal';

type props = {
  products: productProps[]
}

const Section_DiaDosPais: React.FC<props> = ({ products }) => {
  return (
    <>
      <div className=" self-center flex flex-col items-start bg-zinc-100 w-full px-8 mb-[40px]">
        <div className=" left-0 top-0 my-5">
          <p className=" text-left lg:text-left text-xl w-[200px]  font-normal">Dia dos pais</p>
          <div className="w-[150px] h-2 bg-blue-500 rounded-md"></div>
        </div>
        <ul className="flex flex-col items-center w-full  sm:flex-row sm:flex-wrap gap-y-1 gap-x-0">
          {products.slice(0, 6).map((produto) => (
            <>
              <ProductHorizontal product={produto} />
            </>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Section_DiaDosPais;