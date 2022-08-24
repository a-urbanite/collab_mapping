import EditableMapLoader from '../components/LeafletMap/EditableMapLoader'
import ExportUI from '../components/LeafletMap/ExportUI'

const EditMap = (props: any) => {

  return (
    <>
      <EditableMapLoader />
      <ExportUI/>
    </>
  )
}

export async function getServerSideProps() {
  const data = await fetch('http://localhost:3000/api/locations')
  const locations = await data.json()
  return { props: { locations } }
}

export default EditMap