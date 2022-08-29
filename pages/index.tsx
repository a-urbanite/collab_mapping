import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LeafletMapLoader from '../components/LeafletMap/LeafletMapLoader'
import { setLocations } from '../reduxState/locationsSlice'

function HomePage(props: any) {

  // useEffect(() => { 
  //   console.log("Props: ", props.locations)
  // }, [])

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