import dynamic from 'next/dynamic'
import React, { useRef } from 'react'
import Drawtools from '../components/LeafletMap/Drawtools'
import LeafletMapLoader from '../components/LeafletMap/LeafletMapLoader'
// import Map from '../components/GoogleMap'
import EditableMapLoader from '../components/LeafletMap/EditableMapLoader'


const EditMap = (props: any) => {

  const drawnLayersRef = useRef(null);

  return (
    <>
      <EditableMapLoader locations={props.locations} drawnLayersRef={drawnLayersRef}/>
      <button onClick={() => exportAllFunc(drawnLayersRef)}>Export shit</button>
    </>
  )
}



const exportAllFunc = (featureGroupRef: any) => {
  featureGroupRef.current.eachLayer((layer: any) => console.log("first", layer.toGeoJSON()))
}

export async function getServerSideProps() {
  const data = await fetch('http://localhost:3000/api/locations')
  const locations = await data.json()
  return { props: { locations } }
}

export default EditMap