import { Analytics } from '@vercel/analytics/react';
import Footer from '../components/footer/footer'
import Header2 from '../components/header/header'
import '../styles/globals.css'
import { Montserrat } from '@next/font/google'

const montserrat = Montserrat({
  preload: true,
  weight: [
    '100', '200', '300', '400', '500', '600', '700', '800', '900',
  ]
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <div className={montserrat.className}>
        <Header2 />
        <main>
          <Component {...pageProps} />
        </main>
        <Analytics />
        <Footer />
      </div>
    </>
  )
}
