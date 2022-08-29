import EditableMapLoader from '../components/EditableLeafletMap/EditableMapLoader'
import ExportUI from '../components/EditableLeafletMap/ExportUI/ExportUI'
import LoadingOverlay from 'react-loading-overlay-ts';
import { useSelector } from 'react-redux';

const EditMap = () => {
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

export default EditMap