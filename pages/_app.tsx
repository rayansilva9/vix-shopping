import { Analytics } from '@vercel/analytics/react'
import Footer from '../components/footer/footer'
import Header2 from '../components/header/header'
import '../styles/globals.css'
import '../styles/editProfile.css'
import '../styles/cardHover.css'
import '../styles/alertDialog.css'
import { Montserrat } from '@next/font/google'
import { UserContextProvider } from '../context/userContext'
import { CartContextProvider } from '../context/cartContext'
import CartContent from '../components/cart'
import LoadingBar from '../components/loadingPage'
import '../i18nify'
import { CurrencyContextProvider } from '../context/currencyContext'
const montserrat = Montserrat({
  preload: true,
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <UserContextProvider>
        <CartContextProvider>
          <CurrencyContextProvider>
            <div className={montserrat.className}>
              <Header2 />
              {/* <LoadingBar /> */}
              <main className="no-scrollbar">
                <Component {...pageProps} />
              </main>
              <CartContent />
              <Analytics />
              <Footer />
            </div>
          </CurrencyContextProvider>
        </CartContextProvider>
      </UserContextProvider>
    </>
  )
}
