import React from 'react'
import Head from 'next/head'
import { db } from '../lib/firebase'
import HeroBg from '../components/home/section_Hero'
import SectionBeneficios from '../components/home/section_Beneficios'
import productProps from '../@types/productHome'
import Section_EmAlta from '../components/home/section_emAlta'
import Section_Categoria from '../components/home/section_Categorias'
import Section_ModaFeminina from '../components/home/section_ModaFeminina'
import Section_DiaDosPais from '../components/home/section_diaDosPais'

interface Props {
  products: productProps[]
}

export const getStaticProps = async () => {

  const productsDocs = await db.collection('products').get()

  const products = productsDocs.docs.map((e) => (
    {
      photos: e.data().photos,
      name: e.data().name,
      precoAvenda: e.data().precoAvenda,
      id: e.data().id,
      rating: e.data().rating,
    }
  ))


  return {
    props: {
      products: products
    }
  }
}

const Home: React.FC<Props> = ({ products }) => {

  return (
    <>
      <Head>
        <title>Noir Shopping</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="icon" href="/favicon.ico" />
        <meta content="index, follow" name="robots" />
        <meta
          data-rh="true"
          name="keywords"
          content=""
        />
      </Head>
      <HeroBg />
      <SectionBeneficios />
      <main className="flex flex-col w-[calc(100vw)] xl:px-10 2xl:w-[calc(100vw)] mx-auto bg-zinc-100 select-none">
        <Section_EmAlta products={products} />
        <Section_Categoria />
        <Section_DiaDosPais products={products} />
      </main>
      <Section_ModaFeminina />
    </>
  )
}

export default Home
