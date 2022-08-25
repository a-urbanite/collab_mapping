import { commitDrawnFeatures } from '../../reduxState/drawSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../reduxState/store'
import styles from '../../styles/components/exportUI.module.css'
import Router from 'next/router'
import { useState } from 'react'
import LoadingOverlay from 'react-loading-overlay-ts';
import { activateLoader, deactivateLoader } from '../../reduxState/loadingSlice'

const ExportUI = () => {

  const dispatch = useDispatch<AppDispatch>()
  const drawnFeatures = useSelector((state: any) => state.drawnFeatures)

  const commitDrawings = async () => {
    // setLoading(true)
    dispatch(activateLoader())
    dispatch(commitDrawnFeatures(drawnFeatures))
    await setTimeout(() => {
      dispatch(deactivateLoader())
    }, 1000);
    // Router.push('/')
  }

  return (
      <div className={styles.wrapper}>
        <button className={styles.button} onClick={() => commitDrawings()}>Export shit</button>
      </div>
  )
}


export default ExportUI