import '../styles/globals.css'
import type { AppProps } from 'next/app'
import MainNav from '../components/MainNav/MainNav'
import { Provider, useSelector } from 'react-redux'
import { reduxstore } from '../reduxState/store'

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <Provider store={reduxstore}>
        <MainNav/>
        <main> 
          <Component {...pageProps}/>
        </main>
    </Provider>
  )
}

export default MyApp
