import { commitDrawnFeatures } from '../../reduxState/drawSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../reduxState/store'

const ExportUI = () => {
  const dispatch = useDispatch<AppDispatch>()
  const drawnFeatures = useSelector((state: any) => state.drawnFeatures)

  return (
    <button onClick={() => dispatch(commitDrawnFeatures(drawnFeatures))}>Export shit</button>
  )
}


export default ExportUI