import LeafletMapLoader from '../../components/MainLeafletMap/LeafletMapLoader'
import { env } from 'process';

function HomePage(props: any) {

  return (
    <LeafletMapLoader locations={props.locations}/>
  )
}

export async function getServerSideProps() {
  const url = `${env.NEXT_ENV_HOST}/api/locations`
  const res = await fetch(url)
  const locations = await res.json()
  return { props: { locations } }
}

export default HomePage