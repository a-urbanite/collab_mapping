import Head from 'next/head'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GoogleMap from '../components/GoogleMap'
import LeafletMapLoader from '../components/LeafletMap/LeafletMapLoader'
import { locationsType } from './api/starterSet'
import { getLocations, addLocations } from '../reduxState/reduxState'

interface HomepageProps {
  locations: locationsType
}

function HomePage(props: HomepageProps) {

  const dispatch = useDispatch()

  const state = useSelector((state: any) => state.locations)

  useEffect(() => {
    console.log("page loaded!")
    // dispatch({type: 'incremented'})
    dispatch(addLocations(props.locations))
  }, [])
  
  setTimeout(() => {
    console.log(state)
    
  }, 200);
  

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