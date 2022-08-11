import React, { useRef } from 'react'
import { useSelector } from 'react-redux';
import EditableMapLoader from '../components/LeafletMap/EditableMapLoader'
import ExportUI from '../components/LeafletMap/ExportUI'


const EditMap = (props: any) => {

  const drawnLayersRef = useRef(null);
  // const preexistingLocations = useSelector((state: any) => state.locations)
  // console.log("LOCATOINS", preexistingLocations)

  return (
    <>
      <EditableMapLoader locations={props.locations} drawnLayersRef={drawnLayersRef}/>
      <ExportUI drawnLayersRef={drawnLayersRef}/>
    </>
  )
}

export async function getServerSideProps() {
  const data = await fetch('http://localhost:3000/api/locations')
  const locations = await data.json()
  return { props: { locations } }
}

export default EditMap