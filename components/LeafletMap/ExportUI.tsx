import { commitDrawnFeatures } from '../../reduxState/drawSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../reduxState/store'
import styles from '../../styles/components/exportUI.module.css'
import Router from 'next/router'
import { useEffect } from 'react'
import { activateLoader, deactivateLoader } from '../../reduxState/loadingSlice'

const ExportUI = () => {

  const dispatch = useDispatch<AppDispatch>()
  const drawnFeatures = useSelector((state: any) => state.drawnFeatures)
  const isLoading = useSelector((state: any) => state.isLoading)

  useEffect(() => {
    if (isLoading && drawnFeatures.length === 0) {
      setTimeout(() => {
        dispatch(deactivateLoader())
        Router.push('/')
      }, 700);
    }
  }, [drawnFeatures])
  

  const commitDrawings = async () => {
    dispatch(activateLoader())
    dispatch(commitDrawnFeatures(drawnFeatures))
  }

  return (
      <div className={styles.wrapper}>
        <button className={styles.button} onClick={() => commitDrawings()}>Export shit</button>
      </div>
  )
}


export default ExportUI