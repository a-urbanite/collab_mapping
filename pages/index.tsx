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

  // const dispatch = useDispatch()
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
  // const data = await fetch('http://localhost:3000/api/locations')
  const db = getFirestore(app);
  const dbRef = collection(db, "features3" )
  const res = await getDocs(dbRef);
  const locations: any[] = res.docs.map((doc) => {
      const data = doc.data()
      const geojsonObj = JSON.parse(data.feature)
      geojsonObj.properties.firebaseDocID = doc.id
      return geojsonObj
  })
  return { props: { locations } }
}

export default HomePage