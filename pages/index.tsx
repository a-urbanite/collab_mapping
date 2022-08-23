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

  const dispatch = useDispatch()
  useEffect(() => { 
    console.log("Props: ", props)
    // dispatch(addLocations(props.locations)) 
  }, [])

  return (
    <>
      <LeafletMapLoader locations={props.locations}/>
    </>
  )
}

export async function getServerSideProps() {
  // const data = await fetch('http://localhost:3000/api/locations')
  const db = getFirestore(app);
  const dbRef = collection(db, "features3" )
  const data = await getDocs(dbRef);
  const locations: any[] = data.docs.map((doc) => ({...doc.data(), fireBaseId: doc.id}))
  locations.forEach(location => {
    location.feature = JSON.parse(location.feature)
  });
  console.log("getServerSideProps: ", locations)
  // const locations = await data.json()
  return { props: { locations } }
}

export default HomePage