import dynamic from 'next/dynamic'
import React from 'react'
import { locationsType } from '../../pages/api/starterSet'

interface leafletLoaderProps {
  locations: locationsType
  drawnLayersRef: any
}

const LeafletMapLoader = ({ locations, drawnLayersRef }: leafletLoaderProps) => {

  const Map = dynamic(
    () => import('./EditableMap'),
    { 
      loading: () => <p>Map is loading</p>,
      ssr: false
    }
  )
  
  return (
    <>
      <Map locations={locations} drawnLayersRef={drawnLayersRef}/>
    </>
  )
}


export default LeafletMapLoader