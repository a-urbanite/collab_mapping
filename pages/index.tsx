import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LeafletMapLoader from '../components/LeafletMap/LeafletMapLoader'
import { setLocations } from '../reduxState/locationsSlice'
import { env } from 'process';

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
  const url = `${env.NEXT_ENV_HOST}/api/locations`
  // console.log("ENV URL", url)
  const res = await fetch(url)
  const locations = await res.json()
  return { props: { locations } }
}

export default HomePage