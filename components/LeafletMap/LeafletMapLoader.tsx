import dynamic from 'next/dynamic'

const LeafletMapLoader = ({ locations }: any) => {

  const Map = dynamic(
    () => import('./LeafletMap'),
    { 
      loading: () => <p>Map is loading</p>,
      ssr: false
    }
  )
  
  return (
    <>
      <Map locations={locations}/>
    </>
  )
}


export default LeafletMapLoader