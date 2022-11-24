import '../styles/globals.css'
import type { AppProps } from 'next/app'
import MainNav from '../components/MainNav/MainNav'
import { Provider, useSelector } from 'react-redux'
import { reduxstore } from '../reduxState/store'
import { UserContextProvider } from '../components/UserContext'

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <UserContextProvider>
      <Provider store={reduxstore}>
          <MainNav/>
          <main> 
            <Component {...pageProps}/>
          </main>
      </Provider>
    </UserContextProvider>
  )
}

export default MyApp
