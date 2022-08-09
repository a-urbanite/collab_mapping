import dynamic from 'next/dynamic'
import React from 'react'
import { locationsType } from '../../pages/api/starterSet'

const LeafletMapLoader = (locations: any) => {

  const Map = dynamic(
    () => import('./LeafletMap'),
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false
    }
  )
  
  return (
    <>
      <Map locations={locations}/>
    </>
  )
}


export default LeafletMapLoader