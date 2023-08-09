import React from 'react';
import productProps from '../../@types/productHome';
import ProductHorizontal from './productHorizontal';

type props = {
  products: productProps[]
}

const Section_DiaDosPais: React.FC<props> = ({ products }) => {
  return (
    <>
      <div className="bg-zinc-100 w-full sm:w-screen md:w-[768px] lg:w-[full] mb-[40px]">
        <div className="block my-5 pl-[29px] md:pl-[64px] lg:pl-[100px]">
          <p className=" text-left lg:text-left text-2xl w-[200px]  font-normal">Dia dos pais</p>
          <div className="w-[150px] h-2 bg-blue-500 rounded-md"></div>
        </div>
        <ul className="flex flex-col items-center lg:w-screen sm:pl-[25px] lg:pl-[100px] md:pl-[60px] md:w-screen sm:flex-row sm:flex-wrap gap-2">
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