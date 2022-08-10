import Head from 'next/head'
import { useEffect } from 'react'
import GoogleMap from '../components/GoogleMap'
import LeafletMapLoader from '../components/LeafletMap/LeafletMapLoader'
import { locationsType } from './api/starterSet'

interface HomepageProps {
  locations: locationsType
}

function HomePage(props: HomepageProps) {

  // const exportGeoJSON = () => {

  //     // Extract GeoJson from featureGroup
  //     var data = featureGroup.toGeoJSON();

  //     // Stringify the GeoJson
  //     var convertedData = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));

  //     // Create export
  //     document.getElementById('export').setAttribute('href', 'data:' + convertedData);
  //     document.getElementById('export').setAttribute('download','data.geojson');
  
  // }

  return (
    <>
      <LeafletMapLoader locations={props.locations}/>
      {/* <GoogleMap/> */}
      {/* <button onClick={exportGeoJSON()}>Export GeoJSON</button> */}
    </>
  )
}

export async function getServerSideProps() {
  const data = await fetch('http://localhost:3000/api/locations')
  const locations = await data.json()
  return { props: { locations } }
}

export default HomePage