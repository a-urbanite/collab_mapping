import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-draw/dist/leaflet.draw.css'
import { FeatureGroup, MapContainer, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet'
import { locationsType } from '../../pages/api/starterSet'
import { EditControl } from 'react-leaflet-draw'
import L from 'leaflet';
import { useRef } from 'react';
// import GeoJSON from 'geojson';


interface leafletMapProps {
  locations: locationsType
}

const LeafletMap = ({ locations }:leafletMapProps) => {

  return (
    <>
      <MapContainer center={[52.5200, 13.4050]} zoom={13} scrollWheelZoom={true} style={{height: 400, width: "100%"}}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location: any) => 
          // <Marker 
          //   key={location.id} 
          //   position={location.coords}>
          //   {/* <Popup>
          //     {location.name} <br /> {location.description}
          //   </Popup> */}
          // </Marker>
          <GeoJSON data={location.feature} key={location.fireBaseId}></GeoJSON>
          
          )}
          
      </MapContainer>
      
    </>
  )

}




export default LeafletMap