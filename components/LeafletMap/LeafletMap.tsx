import { FeatureGroup, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'

import { locationsType } from '../../pages/api/starterSet'
import L from 'leaflet'
import { EditControl } from 'react-leaflet-draw'

interface leafletMapProps {
  locations: locationsType
}

const LeafletMap = ({ locations }:leafletMapProps) => {

  // console.log(L.Icon.Default.prototype._getIconUrl())

// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//     iconUrl: require('leaflet/dist/images/marker-icon.png'),
//     shadowUrl: require('leaflet/dist/images/marker-shadow.png')
// });

  // console.log("INSIDE THE MAP", locations)

  const customMarker = L.divIcon({
    iconSize: [5, 5],
    iconAnchor: [5 / 2, 5 + 9],
    className: "mymarker",
    html: "😁",
  })

  // const _onEdited = (e: { layers: { eachLayer: (arg0: (layer: any) => void) => void } }) => {
  //   let numEdited = 0;
  //   e.layers.eachLayer((layer) => {
  //     numEdited += 1;
  //   });
  //   console.log(`_onEdited: edited ${numEdited} layers`, e);

  //   _onChange();
  // };

  // const _onCreated = (e: { layerType: any; layer: any }) => {
  //   let type = e.layerType;
  //   let layer = e.layer;
  //   if (type === 'marker') {
  //     // Do marker specific actions
  //     console.log('_onCreated: marker created', e);
  //   } else {
  //     console.log('_onCreated: something else created:', type, e);
  //   }
  //   // Do whatever else you need to. (save to db; etc)

  //   _onChange();
  // };

  // const _onDeleted = (e: { layers: { eachLayer: (arg0: (layer: any) => void) => void } }) => {
  //   let numDeleted = 0;
  //   e.layers.eachLayer((layer) => {
  //     numDeleted += 1;
  //   });
  //   console.log(`onDeleted: removed ${numDeleted} layers`, e);

  //   ._onChange();
  // };

  // const _onMounted = (drawControl: any) => {
  //   console.log('_onMounted', drawControl);
  // };

  // const _onEditStart = (e: any) => {
  //   console.log('_onEditStart', e);
  // };

  // const _onEditStop = (e: any) => {
  //   console.log('_onEditStop', e);
  // };

  // const _onDeleteStart = (e: any) => {
  //   console.log('_onDeleteStart', e);
  // };

  // const _onDeleteStop = (e: any) => {
  //   console.log('_onDeleteStop', e);
  // };

  return (
    <MapContainer center={[52.5200, 13.4050]} zoom={13} scrollWheelZoom={false} style={{height: 400, width: "100%"}}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location: any) => 
        <Marker 
          key={location.id} 
          position={location.coords}
          icon={customMarker}>
          <Popup>
            {location.name} <br /> {location.description}
          </Popup>
        </Marker>
        
        )}
        <FeatureGroup>
          <EditControl
            position="topright"
            draw={{
              rectangle: false,
            }}
          />
        </FeatureGroup>
    </MapContainer>
  )
}


export default LeafletMap