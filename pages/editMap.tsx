import EditableMapLoader from '../components/LeafletMap/EditableMapLoader'
import ExportUI from '../components/LeafletMap/ExportUI'
import LoadingOverlay from 'react-loading-overlay-ts';
import { useSelector } from 'react-redux';

const EditMap = (props: any) => {
  const isLoading = useSelector((state: any) => state.isLoading)

  return (
  <>
    <LoadingOverlay active={isLoading} spinner fadeSpeed={220} text='Loading your content...' >
      <EditableMapLoader />
      <ExportUI />
    </LoadingOverlay>
  </>
  )
}

export async function getServerSideProps() {
  const data = await fetch('http://localhost:3000/api/locations')
  const locations = await data.json()
  return { props: { locations } }
}

export default EditMap