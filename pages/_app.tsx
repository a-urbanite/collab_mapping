import '../styles/globals.css'
import type { AppProps } from 'next/app'
import MainNav from '../components/MainNav/MainNav'
import { Provider } from 'react-redux'
import { reduxstore } from '../reduxState/reduxState'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={reduxstore}>
      <MainNav></MainNav>
      <main> 
        <Component {...pageProps}/>
      </main>
    </Provider>
  )
}

export default MyApp
