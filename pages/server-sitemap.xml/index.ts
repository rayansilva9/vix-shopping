import { getServerSideSitemap } from 'next-sitemap'
import { GetServerSidePropsContext } from 'next/types'
import { db } from '../../lib/firebase'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {

  const res = await db.collection('products').get()

  const paths = res.docs.map(produto => ({
    params: {
      productPage: produto.data().id
    }
  }))

  // Vou criar um fields, onde busco o slug da minha resposta
  // E com o slug vou preenchendo dinamicamente cada post que tenho
  const fields = paths.map(id => ({
    loc: `https://localhost:3000/produto/${id.params.productPage}`,
    lastmod: new Date().toISOString()
    // changefreq
    // priority
  }))

  return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
// eslint-disable-next-line @typescript-eslint/no-empty-function
export default () => {}
