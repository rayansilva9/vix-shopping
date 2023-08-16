import React from 'react'
import { BsFunnel } from 'react-icons/bs'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { MdOutlineFormatListBulleted } from 'react-icons/md'
import { IoApps } from 'react-icons/io5'
import { db } from '../../lib/firebase'
import productPropsCategory from '../../@types/productCategory'
import ProductVertCategory from '../../components/categoryPage/productVertical'
import ProductHorizCategory from '../../components/categoryPage/productHorizontal'
import ModalOrderBy from '../../components/categoryPage/orderBy'
import client from '../../lib/mongo'

export const getStaticPaths = async () => {
  await client.connect()
  const db = client.db('loja')
  const coll = db.collection('produtos')
  const cursor = coll.find({})
  const docs = await cursor.toArray()

  const paths = docs.map(item => ({
    params: {
      categoryPage: item.category // Passe a categoria diretamente como parâmetro
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  await client.connect()
  const db = client.db('loja')
  const coll = db.collection('produtos')

  const filter = { category: params.categoryPage } // Crie um filtro com a categoria
  const docs = await coll.find(filter).toArray() // Busque os documentos usando o filtro
  // Converta o _id de cada documento para string
  const serializedDocs = docs.map(doc => ({
    ...doc,
    _id: doc._id.toString()
  }))

  return {
    props: {
      produto: serializedDocs // Passe os documentos como prop
    }
  }
}

const Categoria: React.FC<productPropsCategory> = ({ produto }) => {
  const [modeView, setModeView] = React.useState<string>('grid')

  return (
    <>
      <div className="min-h-screen min-w-screen flex bg-zinc-100 overflow-visible relative pt-8 md:px-6 xl:px-10 ">
        <div
          style={{
            boxShadow: '#0000003f 0px 3px 10px -5px',
            position: 'sticky',
            top: '10px',
            zIndex: 10
          }}
          className="md:w-[200px] lg:w-[300px] h-[200px] bg-white rounded-xl md:px-2 xl:px-6 py-4 hidden md:inline "
        >
          <p className="text-xl">Filtrar</p>
          <div className="flex flex-col items-start gap-3 my-4 w-full px-4">
            <div className="flex justify-between w-full">
              <p className="text-sm text-gray-600">Visualização</p>
              <div className="inline-flex gap-2 items-center justify-end  text-gray-400">
                <IoApps
                  onClick={() => {
                    setModeView('grid')
                  }}
                  className={`text-xl cursor-pointer ${
                    modeView == 'grid' ? 'text-black' : 'text-gray-400'
                  }`}
                />
                <MdOutlineFormatListBulleted
                  onClick={() => {
                    setModeView('list')
                  }}
                  className={`text-2xl cursor-pointer ${
                    modeView == 'list' ? 'text-black' : 'text-gray-400'
                  }`}
                />
              </div>
            </div>
            {/* <ModalOrderBy>
              <div className="inline-flex items-center flex-1 gap-2 cursor-pointer ">
                <p
                  className='text-sm text-gray-600 '
                >
                  Ordenar por
                </p>
                <MdOutlineKeyboardArrowDown />
              </div>
            </ModalOrderBy> */}
          </div>
        </div>
        <div className="flex-1 md:px-[40px]  lg:px-[60px] mx-auto">
          <div className="block px-4">
            <p className="text-xl">{produto[0].category.replaceAll('-', ' ')}</p>
            <p className="text-xs text-gray-600 my-2">{produto.length} produtos</p>
          </div>
          <div className="block h-full w-full">
            <div
              style={{
                position: 'sticky',
                top: '0px',
                height: '45px',
                zIndex: 4,
                flex: 1
              }}
              className=" bg-zinc-100 py-2 my-4 h-9 md:hidden"
            >
              <div className="flex w-full px-4">
                <div className="inline-flex items-center flex-1 gap-2 text-gray-600">
                  <BsFunnel />
                  <p className="text-sm ">Filtrar</p>
                </div>
                {/* <div className="inline-flex items-center flex-1 gap-2 ">
                  <ModalOrderBy>
                    <div>
                      <p
                        className='text-sm text-gray-600'
                      >
                        Ordenar por
                      </p>
                      <MdOutlineKeyboardArrowDown />
                    </div>
                  </ModalOrderBy>
                </div> */}
                <div className="inline-flex gap-2 items-center justify-end flex-1 text-gray-400">
                  <IoApps
                    onClick={() => {
                      setModeView('grid')
                    }}
                    className={`text-xl ${
                      modeView == 'grid' ? 'text-black' : 'text-gray-400'
                    }`}
                  />
                  <MdOutlineFormatListBulleted
                    onClick={() => {
                      setModeView('list')
                    }}
                    className={`text-2xl ${
                      modeView == 'list' ? 'text-black' : 'text-gray-400'
                    }`}
                  />
                </div>
              </div>
            </div>
            <div className="w-full relative flex flex-wrap rounded-xl bg-white py-2">
              {modeView == 'grid'
                ? produto.map(e => <ProductHorizCategory e={e} />)
                : produto.map(e => <ProductVertCategory e={e} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Categoria
