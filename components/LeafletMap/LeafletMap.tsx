import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-draw/dist/leaflet.draw.css'
import { FeatureGroup, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { locationsType } from '../../pages/api/starterSet'
import { EditControl } from 'react-leaflet-draw'
import L from 'leaflet';
import { useRef } from 'react';


interface leafletMapProps {
  locations: locationsType
}

const LeafletMap = ({ locations }:leafletMapProps) => {

  const featureGroupRef = useRef(null);

  return (
    <>
      <MapContainer center={[52.5200, 13.4050]} zoom={13} scrollWheelZoom={true} style={{height: 400, width: "100%"}}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location: any) => 
          <Marker 
            key={location.id} 
            position={location.coords}>
            <Popup>
              {location.name} <br /> {location.description}
            </Popup>
          </Marker>
          
          )}
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
      </MapContainer>
      <button onClick={() => exportAllFunc(featureGroupRef)}>Export all hopefully?</button>
    </>
  )

}

const exportAllFunc = (featureGroupRef: any) => {
  featureGroupRef.current.eachLayer((layer: any) => console.log("first", layer.toGeoJSON()))
}


export default LeafletMap