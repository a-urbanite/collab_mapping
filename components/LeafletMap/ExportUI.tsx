import { commitDrawnFeatures } from '../../reduxState/drawSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../reduxState/store'

const ExportUI = (drawnLayersRef: any) => {
  const dispatch = useDispatch<AppDispatch>()
  const drawnFeatures = useSelector((state: any) => state.drawnFeatures)

  // const exportAllFunc = ({drawnLayersRef}: any) => {
  //   // console.log(drawnLayersRef)
  //   // drawnLayersRef.current.eachLayer((layer: any) => console.log("first", layer.toGeoJSON()))
  //   dispatch(commitDrawnFeatures(drawnFeatures))
  // }

  return (
    <button onClick={() => dispatch(commitDrawnFeatures(drawnFeatures))}>Export shit</button>
  )
}


export default ExportUI