import React, { useRef } from 'react'
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

const Drawtools = () => {

  const featureGroupRef = useRef(null);
  
  return (
    <FeatureGroup
            ref={featureGroupRef}
          >
            <EditControl
              position="topright"
              draw={{
                rectangle: false,
                circle: true,
                circlemarker: false,
                polyline: { 
                  showLength: true,
                  metric: true }
              }}
              onEdited={(e) => {
                console.log("Pressed Save button in edit bar")
                console.log("ONEDITED", e)
              }}
              onCreated={(e) => {
                console.log("onCreated!")
                console.log("CREATED LAYER", e.layer.toGeoJSON())
              }}
              onDeleted={() => console.log("onDeleted!")}
              onMounted={() => console.log("onMounted!")}
              onEditStart={() => console.log("Edit bar opened")}
              onEditStop={() => console.log("Pressed Cancel button in Edit Bar")}
              onDeleteStart={() => console.log("onDeleteStart!")}
              onDeleteStop={() => console.log("onDeleteStop!")}
              onDrawStart={() => console.log("onDrawStart!")}
              onDrawStop={() => console.log("onDrawStop!")}
              onDrawVertex={() => console.log("onDrawVertex!")}
              onEditMove={() => console.log("onEditMove!")}
              onEditResize={() => console.log("onEditResize!")}
              onEditVertex={() => console.log("onEditVertex!")}
            />
          </FeatureGroup>
  )
}

export default Drawtools