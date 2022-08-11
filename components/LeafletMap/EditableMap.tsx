import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-draw/dist/leaflet.draw.css'
import { FeatureGroup, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { locationsType } from '../../pages/api/starterSet'
import { EditControl } from 'react-leaflet-draw'
import styles from '../../styles/components/popupForm.module.css'
import L from 'leaflet';
import { useRef } from 'react';
import PopupForm from './PopupForm'


interface leafletMapProps {
  locations: locationsType
  drawnLayersRef: any
}

const popupForm = 
'<form className="popupForm__form">\
<input name="name" placeholder="name..." className="popupForm__input"/>\
<input name="description" placeholder="description..." className="popupForm__input"/>\
<input type="submit" value="save" className="popupForm__submit"/>\
</form>'

const LeafletMap = ({ locations, drawnLayersRef }:leafletMapProps) => {

  // const featureGroupRef = useRef(null);

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
            ref={drawnLayersRef}
          >
            <EditControl
              position="topright"
              draw={{
                rectangle: false,
                circle: true,
                circlemarker: false,
                polyline: { 
                  showLength: true,
                  metric: true },
                polygon: {
                  allowIntersection: false, // Restricts shapes to simple polygons
                  drawError: {
                    color: 'red', // Color the shape will turn when intersects
                    message: '<strong>That´s a terrible polygon! Draw that again!' // Message that will show when intersect
                  },
                  shapeOptions: {
                    // color: '#97009c'
                  }}
              }}
              onEdited={(e) => {
                console.log("Pressed Save button in edit bar")
                console.log("ONEDITED", e)
              }}
              onCreated={(e) => {
                console.log("onCreated!")
                console.log("CREATED LAYER", e.layer.toGeoJSON())
                e.layer.bindPopup(popupForm).openPopup();
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
      
    </>
  )

}




export default LeafletMap