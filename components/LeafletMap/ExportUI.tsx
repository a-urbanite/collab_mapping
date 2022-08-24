import { commitDrawnFeatures } from '../../reduxState/drawSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../reduxState/store'
import styles from '../../styles/components/exportUI.module.css'

const ExportUI = () => {
  const dispatch = useDispatch<AppDispatch>()
  const drawnFeatures = useSelector((state: any) => state.drawnFeatures)

  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={() => dispatch(commitDrawnFeatures(drawnFeatures))}>Export shit</button>
    </div>
  )
}


export default ExportUI