import { useEffect } from 'react'
import LeafletMapLoader from '../components/LeafletMap/LeafletMapLoader'

function HomePage(props: any) {

  useEffect(() => { 
    console.log("Props: ", props)
  }, [])

  return (
    <>
      <LeafletMapLoader locations={props.locations}/>
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/locations')
  const locations = await res.json()
  return { props: { locations } }
}

export default HomePage