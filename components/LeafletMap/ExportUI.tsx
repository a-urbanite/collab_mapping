import React from 'react'

const ExportUI = (drawnLayersRef: any) => {
  return (
    <button onClick={() => exportAllFunc(drawnLayersRef)}>Export shit</button>
  )
}

const exportAllFunc = ({drawnLayersRef}: any) => {
  // console.log(drawnLayersRef)
  drawnLayersRef.current.eachLayer((layer: any) => console.log("first", layer.toGeoJSON()))
}

export default ExportUI