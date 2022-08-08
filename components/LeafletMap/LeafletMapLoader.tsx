import dynamic from 'next/dynamic'
import React from 'react'

const LeafletMapLoader = () => {

  const Map = dynamic(
    () => import('./Map'), // replace '@components/map' with your component's location
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false // This line is important. It's what prevents server-side render
    }
  )
  
  return (
    <>
      <Map/>
    </>
  )
}

export default LeafletMapLoader