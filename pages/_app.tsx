import '../styles/globals.css'
import type { AppProps } from 'next/app'
import MainNav from '../components/MainNav/MainNav'

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <>
    <MainNav></MainNav>
    <main> 
      <Component {...pageProps}/>
    </main>
  </>
  )
}

export default MyApp
