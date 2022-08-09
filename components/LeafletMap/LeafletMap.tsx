import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { locationsType } from '../../pages/api/starterSet'



const LeafletMap = ({locations}:any) => {

  console.log("INSIDE THE MAP", locations.locations)

  return (
    <MapContainer center={[52.5200, 13.4050]} zoom={13} scrollWheelZoom={false} style={{height: 400, width: "100%"}}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.locations.map((location: any) => 
        <Marker 
          key={location._id} 
          position={location.coords} 
        />
        )}
      <Marker position={[52.5200, 13.4050]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}


export default LeafletMap