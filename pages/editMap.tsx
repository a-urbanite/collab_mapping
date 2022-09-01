import EditableMapLoader from '../components/EditableLeafletMap/EditableMapLoader'
import ExportUI from '../components/EditableLeafletMap/ExportUI/ExportUI'
import LoadingOverlay from 'react-loading-overlay-ts';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Router from 'next/router';

const EditMap = () => {
  const isLoading = useSelector((state: any) => state.isLoading)
  const currentUser = useSelector((state: any) => state.currentUser)

  //redirects to start page in case of empty user
  useEffect(() => {
    if (!currentUser) {
      Router.push('/')
    }
  }, [])

  if (!currentUser) {
    return <></>
  }

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