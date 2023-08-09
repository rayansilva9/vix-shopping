import { Divider } from '@mui/material';
import Image from 'next/image';
import React, { memo } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiChevronRight } from 'react-icons/bi';
import { FaShare } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';


type props = {
  priceId: string
  quantidade: number,
  variedade: string[]
  setQuantidadeUnitariaToBuy: React.Dispatch<React.SetStateAction<number>>
}
// #0BC86D;


const ProductPayInfo: React.FC<props> = ({ priceId, quantidade, variedade, setQuantidadeUnitariaToBuy }) => {
  return (
    <>
      <div className="bg-white w-[94%]  md:w-[calc(100vw-216px)] xl:w-auto xl:hidden rounded-lg py-2 px-4 mt-5 ">
        <p className="text-lg font-medium text-gray-700 ">Métodos de pagamento</p>
        <div className="flex gap-2 items-center">
          <Image src="/visa-icon.png" alt="" width={50} height={30} />
          <Image src="/mastercard-icon.png" alt="" width={50} height={30} />
          <Image src="/boleto-icon.png" alt="" width={50} height={20} />
          <Image
            src="/pix-icon.png"
            alt=""
            width={40}
            height={40}
            style={{ height: '40px', marginLeft: '3px' }}
          />
        </div>
      </div>
      {/* 3 */}
      <div
        style={{ boxShadow: ' rgba(0, 0, 0, 0.25) 0px 3px 10px -5px' }}
        className="bg-white w-[94%]  md:w-[calc(100vw-216px)] xl:w-auto border rounded-xl mt-5 lg:mt-0 p-3"
      >
        <Divider className="lg:inline hidden" />
        <div className="flex flex-col gap-2 pr-4 pl-2">
          <div className="flex items-center justify-between">
            <p className="text-lg font-medium text-gray-700 xl:hidden ">Entrega</p>
            <div className="flex items-center justify-between w-full">
              <p className="text-lg font-bold text-gray-700 xl:text-[19px] hidden xl:inline">
                Enviar para
              </p>
              <div className="flex items-center gap-1">
                <IoLocationOutline className="text-lg relative top-[2px]" />
                <p className="text-lg text-gray-700 xl:text-[16px] hidden xl:inline">
                  Santa Inês - BA
                </p>
              </div>
            </div>
            <BiChevronRight className="text-2xl xl:hidden" />
          </div>
          <div className="flex flex-col xl:my-4">
            <p className="text-xl font-medium xl:text-[19px]">Frete Grátis</p>
            <p className="text-gray-700 xl:text-[16px]">
              De china para Santa Ines via Correios
            </p>
            <p className="text-gray-700 xl:text-[16px]">
              Estimativa de entrega: 30 dias
            </p>
          </div>
          <Divider />
        </div>
        <div className="flex-col gap-2 px-3 xl:my-4 hidden xl:flex">
          <p className="text-lg font-medium text-gray-700 xl:text-[19px]">
            Metodos de pagamento
          </p>
          <div className="flex flex-col ">
            <p className="text-sm text-gray-700 xl:text-[16px]">
              Segurança garantida
            </p>
          </div>
          <Divider />
        </div>
        <div className="px-3 mb-4">
          <p className="font-medium text-gray-700 xl:text-[19px]">Quantidade</p>
          <div className="flex gap-4 my-5">
            <button
              className="w-6 h-6 text-lg bg-slate-200 rounded-full flex items-center justify-center"
              disabled={quantidade <= 1 ? true : false}
              onClick={() => {
                setQuantidadeUnitariaToBuy(prev => prev - 1)
              }}
            >
              -
            </button>
            <p className="text-lg font-medium">{quantidade}</p>
            <button
              className="w-6 h-6 text-lg bg-slate-200 rounded-full flex items-center justify-center"
              disabled={quantidade >= 10 ? true : false}
              onClick={() => {
                setQuantidadeUnitariaToBuy(prev => prev + 1)
              }}
            >
              +
            </button>
          </div>
          <p className="text-lg">432 restantes</p>
        </div>
        <div className=" flex-col gap-3 px-3 hidden xl:flex">
          <form
            action={`/api/checkout/${priceId
              }/${quantidade}/${variedade.join(', ')}`}
            method="POST"
          >
            <button
              type="submit"
              className="w-[350px] hover:bg-green-700 transition-colors py-3 bg-[#0BC86D] rounded-3xl text-lg text-white font-medium"
            >
              <p className="text-md">Compra Agora</p>
            </button>
          </form>
          <div className="flex gap-3">
            <button className="w-full py-2 hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 bg-gray-200 rounded-3xl text-lg text-black font-medium">
              <FaShare style={{ stroke: '1' }} />
              <p className="text-md">Compartlihar</p>
            </button>
            <button className="w-full py-2 hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 bg-gray-200 rounded-3xl text-lg text-black font-medium">
              <AiOutlineHeart />
              <p className="text-md">523</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(ProductPayInfo);