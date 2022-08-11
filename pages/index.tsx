import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LeafletMapLoader from '../components/LeafletMap/LeafletMapLoader'
import { locationsType } from './api/starterSet'
import { addLocations } from '../reduxState/reduxState'

interface HomepageProps {
  locations: locationsType
}

function HomePage(props: HomepageProps) {

  const dispatch = useDispatch()
  useEffect(() => { dispatch(addLocations(props.locations)) }, [])

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