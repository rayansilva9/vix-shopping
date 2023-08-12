import React from 'react';
import ProductHorizontal from '../../components/home/productHorizontal';
import { BsFunnel } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { IoApps } from "react-icons/io5";
import { Paper, Skeleton } from '@mui/material';
import Image from 'next/image';
import { processLink } from '../../functions/fixLinksImg';
import formatarMoeda from '../../functions/formataMoeda';


const Categoria: React.FC = () => {

  const a = ['', '', '', '', '']

  const b = {
    id: '',
    optVal: [
      {
        name: '',
        pid: 0,
        values: [
          {
            image: '',
            name: '',
            propTips: '',
            vid: 0
          }
        ]
      }
    ],
    name: '',
    photos: [''],
    priceId: '',
    precoOriginal: 0,
    inCardBy: 0,
    totalPedidos: 0,
    rating: 0,
    precoAvenda: 0,
    feedback: [''],
    descPrevia: '',
    desc: '',
  }

  const [modeView, setModeView] = React.useState<string>('grid');
  const [currentImg, setcurrentImg] = React.useState<number>(0);

  return (
    <>
      <div className="min-h-screen min-w-screen bg-zinc-100 overflow-visible relative block">
        <div className="block px-4 mt-4 ">
          <p className='text-xl'>Casa e decoração</p>
          <p className='text-xs text-gray-600 my-2'>7 produtos</p>
        </div>

        <div className="block h-full w-full">
          <div style={{ position: 'sticky', top: '0px', height: '45px', zIndex: 999, flex: 1, }} className=" bg-zinc-100 py-2 my-4 h-9 ">
            <div className="flex w-full px-4">
              <div className="inline-flex items-center flex-1 gap-2 text-gray-600">
                <BsFunnel />
                <p className='text-sm '>Filtrar</p>
              </div>
              <div className="inline-flex items-center flex-1 gap-2 ">
                <p className={`text-sm ${modeView == 'grid' ? 'text-black' : 'text-gray-600'}`}>Ordenar por</p>
                <MdOutlineKeyboardArrowDown />
              </div>
              <div className="inline-flex gap-2 items-center justify-end flex-1 text-gray-400">
                <IoApps onClick={() => { setModeView("grid") }} className={`text-xl ${modeView == 'grid' ? 'text-black' : 'text-gray-400'}`} />
                <MdOutlineFormatListBulleted onClick={() => { setModeView("list") }} className={`text-2xl ${modeView == 'list' ? 'text-black' : 'text-gray-400'}`} />
              </div>
            </div>
          </div>
          <div className="w-full relative z-10 flex flex-wrap gap-y-1">
            {modeView == 'grid' ? a.map((e) => (
              <li className='cursor-pointer flex-1 relative ' style={{ maxWidth: '50%', listStyle: 'none', }} >
                <Paper
                  // onMouseEnter={() => { setcurrentImg(1) }}
                  // onMouseLeave={() => { setcurrentImg(0) }}
                  elevation={0}
                  sx={{
                    minHeight: '434px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: { xs: '', md: '', lg: '20px' },
                    paddingY: '20px',
                    paddingX: { xs: '20px', md: '15px' },
                    borderRadius: '16px',

                  }}
                >
                  {b.photos.length == 0 ? (
                    <Skeleton
                      variant="rounded"
                      width={194}
                      height={194}
                      animation="wave"
                    />
                  ) :
                    currentImg == 0 ? (
                      <Image
                        quality={65}
                        style={{ animation: 'productImg .2s linear', }}
                        width={194}
                        height={194}
                        src={
                          b.photos.length > 0 &&
                          processLink(b.photos[0])
                        }
                        alt=""
                      />
                    ) : (
                      <Image
                        quality={65}
                        style={{ animation: 'productImg .5s linear', }}
                        width={194}
                        height={194}
                        src={
                          b.photos.length > 0 &&
                          processLink(b.photos[1])
                        }
                        alt=""
                      />
                    )
                  }
                  <p className="text-zinc-700 text-md">
                    {b && b.name}
                  </p>
                  {/* <div className="flex gap-1 mb-1">
                    <CustomizedRating tamanho={'small'} mt={'-1px'} val={4.6} />
                    <p className="text-gray-500 text-xs">202 avaliaçôes</p>
                  </div> */}
                  <div>
                    <div className="">
                      <p
                        className="text-gray-600"
                        style={{
                          textDecoration: 'line-through',
                          textDecorationThickness: '0.01em'
                        }}
                      >
                        R$ 80,81
                      </p>
                    </div>
                    <p className="text-lg font-semibold">
                      R$ {formatarMoeda(b.precoAvenda)}
                    </p>
                    <p className="text-zinc-700 text-sm">
                      em 12{b.inCardBy}x sem juros
                    </p>
                  </div>
                </Paper>
              </li>
            )) : a.map((e) => (
              <ProductHorizontal product={b} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Categoria;