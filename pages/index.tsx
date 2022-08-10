import Head from 'next/head'
import { useEffect } from 'react'
import GoogleMap from '../components/GoogleMap'
import LeafletMapLoader from '../components/LeafletMap/LeafletMapLoader'
import { locationsType } from './api/starterSet'

interface HomepageProps {
  locations: locationsType
}

function HomePage(props: HomepageProps) {

  return (
    <>
      <LeafletMapLoader locations={props.locations}/>
    </>
  )
}

export async function getServerSideProps() {
  const data = await fetch('http://localhost:3000/api/locations')
  const locations = await data.json()
  return { props: { locations } }
}

export default HomePage