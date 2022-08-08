import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import GMap from '../components/GMap'

function HomePage() {
  const Map = dynamic(
    () => import('../components/Map'), // replace '@components/map' with your component's location
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false // This line is important. It's what prevents server-side render
    }
  )
  return (
    <>
      {/* <Map /> */}
      <Suspense fallback={<p>Loading...</p>}>
        <GMap/>
      </Suspense>
    </>
  )
}

export default HomePage