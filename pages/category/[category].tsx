import { db } from '../../lib/firebase'
import { useMemo, useState } from 'react'
import NavBar from '../../components/navbar/NavBar'
import Link from 'next/link'
import Header2 from '../../components/header/header'

interface Props {
  produtos: []
}

export const getStaticPaths = async () => {
  const res = await db.collection('products').get()

  const paths = res.docs.map(e => ({
    params: {
      category: e.data().category
    }
  }))

  return {
    paths,
    fallback: false
  }
}
export const getStaticProps = async context => {
  const res = await db
    .collection('products')
    .where('category', '==', context.params.category)
    .get()

  const p = res.docs.map(e => e.data())
  const produtos = p

  return {
    props: { produtos }
  }
}

const Category: React.FC<Props> = ({ produtos }) => {
  const [openSearchBar, setOpenSearchBar] = useState(false)
  const [openCategoryHeader, setOpenCategoryHeader] = useState(false)
  const [whichCategoryHeader, setWichCategoryHeader] = useState('')

  const handleOpenSearchBar = () => {
    setOpenSearchBar(true)
  }
  const handleCloseSearchBar = () => {
    setOpenSearchBar(false)
  }
  const closeCategoryHeader_on_scroll = () => {
    setOpenCategoryHeader(false)
  }
  useMemo(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', closeCategoryHeader_on_scroll)
    }
    return () => {
      window.removeEventListener('scroll', closeCategoryHeader_on_scroll)
    }
  }, [])

  // function numDigits(x) {
  //   return (Math.log10((x ^ (x >> 31)) - (x >> 31)) | 0) + 1
  // }

  // function calcPriceInCard() {
  //   let a = (produtos[0].oldPrice - produtos[0].priceInCard) / 100
  //   let b = a.toString()
  //   let c = b.slice(0, 2)

  //   return c
  // }

  return (
    <>
      <Header2 />
      <main className="min-h-screen bg-gray-100">
        <section className="w-full flex justify-center gap-5 flex-wrap">
          {produtos.map((produto: { id: string; photos: string[]; name: string }) => (
            <>
              <Link key={produto.id} href={'../produto/' + produto.id}>
                <div className="bg-white p-2 rounded-md flex justify-center flex-col max-w-160px sm:max-w-320px md:max-w-xs ">
                  <img className="py-2" src={produto.photos[0]} alt="" />
                  <h1 className="text-sm">{produto.name}</h1>
                </div>
              </Link>
            </>
          ))}
        </section>
      </main>
      <NavBar />
    </>
  )
}

export default Category
