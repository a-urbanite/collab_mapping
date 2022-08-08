import GoogleMap from '../components/GoogleMap'
import LeafletMapLoader from '../components/LeafletMap/LeafletMapLoader'

function HomePage() {

  return (
    <>
      <LeafletMapLoader></LeafletMapLoader>
      <GoogleMap/>
    </>
  )
}

export default HomePage