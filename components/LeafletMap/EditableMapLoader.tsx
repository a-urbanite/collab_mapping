import dynamic from 'next/dynamic'
import React from 'react'

const LeafletMapLoader = () => {

  const Map = dynamic(
    () => import('./EditableMap'),
    { 
      loading: () => <p>Map is loading</p>,
      ssr: false
    }
  )
  
  return (
    <Map />
  )
}


export default LeafletMapLoader