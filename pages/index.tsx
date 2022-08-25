import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LeafletMapLoader from '../components/LeafletMap/LeafletMapLoader'
import { locationsType } from './api/starterSet'
import { addLocations } from '../reduxState/locationsSlice'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { app } from '../firebase-config'

interface HomepageProps {
  locations: locationsType
}

function HomePage(props: HomepageProps) {

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