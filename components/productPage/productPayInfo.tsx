import { Divider } from '@mui/material'
import Image from 'next/image'
import React, { memo, useEffect, useState, useContext } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { BiChevronRight } from 'react-icons/bi'
import { FaShare } from 'react-icons/fa'
import { BsCartCheck } from 'react-icons/bs'
import { BsCartDash } from 'react-icons/bs'
import { IoLocationOutline } from 'react-icons/io5'
import { usePathname } from 'next/navigation'
import { UserContext } from '../../context/userContext'
// import AuthGoogle from '../../hooks/googleAuth';
import { CartContext } from '../../context/cartContext'

type props = {
  docId: string
  priceId: string
  id: string
  prico: { brl: string; usd: string; eur: string }
  quantidade: number
  name: string
  photo: string
  variedade: string[]
  setQuantidadeUnitariaToBuy: React.Dispatch<React.SetStateAction<number>>
}

const ProductPayInfo: React.FC<props> = ({
  priceId,
  quantidade,
  variedade,
  setQuantidadeUnitariaToBuy,
  docId,
  name,
  prico,
  photo,
  id
}) => {
  const [countDesejos, setCountDesejos] = useState(0)
  // const [desejos, setDesejos] = useState(false);

  const pathname = usePathname().split('/')

  var produtoId = pathname[pathname.length - 1]
  const { user } = useContext(UserContext)
  const { setProductCart } = useContext(CartContext)

  const desejosLength = async () => {
    try {
      const response = await fetch(`/api/fetchDesejos/${produtoId}`, { method: 'POST' })
      const data = await response.json()

      return data.length // O comprimento será retornado aqui
    } catch (error) {
      console.error('Erro:', error)
      return 0 // Retorna 0 se houver um erro
    }
  }
  const AddToDesejos = async () => {
    if (user !== null) {
      try {
        const response = await fetch(
          `/api/addDesejos/${produtoId}/${user.uid}/${docId}`,
          { method: 'POST' }
        )

        const data = await response.json()
        if (data.exists == true) {
          setCountDesejos(prev => prev - 1)
        } else {
          setCountDesejos(prev => prev + 1)
        }
      } catch (error) {
        console.error('Erro:', error)
        return 0 // Retorna 0 se houver um erro
      }
    } else {
      // AuthGoogle()
    }
  }

  useEffect(() => {
    desejosLength()
      .then(length => {
        setCountDesejos(length)
      })
      .catch(error => {
        console.error('Erro:', error)
      })
  }, [])

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
        className="bg-white w-[94%]  md:w-[calc(100vw-216px)] xl:w-auto border rounded-xl mt-0 lg:mt-0 p-3"
      >
        <Divider className="lg:inline hidden" />
        <div className="flex flex-col gap-2 pr-4 pl-2">
          <div className="flex items-center justify-between">
            <p className="text-lg font-medium text-gray-700 xl:hidden ">Entrega</p>
            <div className="flex items-center justify-between w-full">
              <p className="text-lg font-bold text-gray-700 xl:text-[17px] hidden xl:inline">
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
          <div className="flex flex-col xl:my-1">
            <p className="text-xl font-medium xl:text-[17px]">Frete Grátis</p>
            <p className="text-gray-700 xl:text-[16px]">
              De china para Santa Ines via Correios
            </p>
            <p className="text-gray-700 xl:text-[16px]">Estimativa de entrega: 30 dias</p>
          </div>
          <Divider />
        </div>
        <div className="flex-col gap-2 px-3 xl:my-1 hidden xl:flex">
          <p className="text-lg font-medium text-gray-700 xl:text-[17px]">
            Metodos de pagamento
          </p>
          <div className="flex flex-col ">
            <p className="text-sm text-gray-700 xl:text-[16px]">Segurança garantida</p>
          </div>
          <Divider />
        </div>
        <div className="px-3 mb-4">
          <p className="font-medium text-gray-700 xl:text-[17px]">Quantidade</p>
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
            action={`/api/checkout/${priceId}/${quantidade}/${variedade.join(', ')}`}
            method="POST"
          >
            <button
              type="submit"
              className="w-[350px] cursor-pointer hover:bg-[#3eae78] transition-colors py-3 bg-[#0BC86D] rounded-3xl text-lg text-white font-medium"
            >
              <p className="text-md text-center">Compra Agora</p>
            </button>
          </form>
          <button
            onClick={() => {
              //@ts-ignore
              setProductCart(prev => {
                return [
                  ...prev,
                  {
                    price: priceId,
                    name: name,
                    id: id,
                    photo: photo,
                    prico: prico,
                    tipos: variedade.join(', '),
                    quantity: quantidade
                  }
                ]
              })
            }}
            // style={{ border: '1px solid #0bc86d', }}
            type="submit"
            className="w-[350px] cursor-pointer hover:bg-[#3ffca192]  transition-colors py-3 bg-[#3ffca159] rounded-3xl text-lg text-white font-medium"
          >
            <p className="text-md text-center text-green-600">Adicionar ao carrinho</p>
          </button>
          <div className="flex gap-3">
            <button className="w-full py-2 cursor-pointer hover:bg-gray-300  transition-colors flex items-center justify-center gap-2 bg-gray-200 rounded-3xl text-lg text-black font-medium">
              <FaShare style={{ stroke: '1' }} />
              <p className="text-md">Compartlihar</p>
            </button>
            <button
              onClick={() => {
                AddToDesejos()
              }}
              className="w-full py-2 cursor-pointer hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 bg-gray-200 rounded-3xl text-lg text-black font-medium"
            >
              <AiOutlineHeart />
              <p className="text-md">{countDesejos}</p>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(ProductPayInfo)
