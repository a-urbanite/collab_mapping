import { useEffect } from 'react'
import GoogleMap from '../components/GoogleMap'
import LeafletMapLoader from '../components/LeafletMap/LeafletMapLoader'
import { locationsType } from './api/starterSet'

interface HomepageProps {
  locations: locationsType
}

function HomePage(props: HomepageProps) {

  console.log(props.locations)

  return (
    <>
      <LeafletMapLoader/>
      <GoogleMap/>
    </>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  // console.log("FROM WITHING GETSERVERSIDEPROPS")
  const data = await fetch('http://localhost:3000/api/locations')
  const locations = await data.json()
  // console.log("LOCATIONS: ", locations)
  // Pass data to the page via props
  return { props: { locations } }
}

export default HomePage