import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-draw/dist/leaflet.draw.css'
import { FeatureGroup, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { locationsType } from '../../pages/api/starterSet'
import { EditControl } from 'react-leaflet-draw'
import L from 'leaflet';


interface leafletMapProps {
  locations: locationsType
}

const LeafletMap = ({ locations }:leafletMapProps) => {


  return (
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
          // ref={(reactFGref) => {onFeatureGroupReadyFunc(reactFGref)}}
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
            onEdited={() => console.log("onEdited")}
            onCreated={(e) => {
              console.log("onCreated!")
              console.log("created tingy", e)
              // const { lat, lng } = e.layer.getBounds().getCenter();
              // console.log("[circle]:", {
              //   lat,
              //   lng,
              //   radius: e.layer.getRadius()
              // });
              console.log(e.layer.toGeoJSON())
              
              
            }}
            onDeleted={() => console.log("onDeleted!")}
            onMounted={() => console.log("onMounted!")}
            onEditStart={() => console.log("onEditStart!")}
            onEditStop={() => console.log("onEditStop!")}
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
  )

}

// const onFeatureGroupReadyFunc = (reactFGref: L.FeatureGroup<any> | null) => {
//   // populate the leaflet FeatureGroup with the geoJson layers

//   let leafletGeoJSON = new L.GeoJSON(getGeoJson());
//   let leafletFG = reactFGref;

//   leafletGeoJSON.eachLayer((layer) => {
//     leafletFG.addLayer(layer);
//   });

//   // store the ref for future access to content

//   editableFG = reactFGref;
// };


export default LeafletMap

// function getGeoJson() {
//   return {
//     type: 'FeatureCollection',
//     features: [
//       {
//         type: 'Feature',
//         properties: {},
//         geometry: {
//           type: 'LineString',
//           coordinates: [
//             [-122.47979164123535, 37.830124319877235],
//             [-122.47721672058105, 37.809377088502615],
//           ],
//         },
//       },
//       {
//         type: 'Feature',
//         properties: {},
//         geometry: {
//           type: 'Point',
//           coordinates: [-122.46923446655273, 37.80293476836673],
//         },
//       },
//       {
//         type: 'Feature',
//         properties: {},
//         geometry: {
//           type: 'Point',
//           coordinates: [-122.48399734497069, 37.83466623607849],
//         },
//       },
//       {
//         type: 'Feature',
//         properties: {},
//         geometry: {
//           type: 'Point',
//           coordinates: [-122.47867584228514, 37.81893781173967],
//         },
//       },
//       {
//         type: 'Feature',
//         properties: {},
//         geometry: {
//           type: 'Polygon',
//           coordinates: [
//             [
//               [-122.48069286346434, 37.800637436707525],
//               [-122.48069286346434, 37.803104310307276],
//               [-122.47950196266174, 37.803104310307276],
//               [-122.47950196266174, 37.800637436707525],
//               [-122.48069286346434, 37.800637436707525],
//             ],
//           ],
//         },
//       },
//       {
//         type: 'Feature',
//         properties: {},
//         geometry: {
//           type: 'Polygon',
//           coordinates: [
//             [
//               [-122.48103886842728, 37.833075326166274],
//               [-122.48065531253813, 37.832558431940114],
//               [-122.4799284338951, 37.8322660885204],
//               [-122.47963070869446, 37.83231693093747],
//               [-122.47948586940764, 37.832467339549524],
//               [-122.47945636510849, 37.83273426112019],
//               [-122.47959315776825, 37.83289737938241],
//               [-122.48004108667372, 37.833109220743104],
//               [-122.48058557510376, 37.83328293020496],
//               [-122.48080283403395, 37.83332529830436],
//               [-122.48091548681259, 37.83322785163939],
//               [-122.48103886842728, 37.833075326166274],
//             ],
//           ],
//         },
//       },
//       {
//         type: 'Feature',
//         properties: {},
//         geometry: {
//           type: 'Polygon',
//           coordinates: [
//             [
//               [-122.48043537139893, 37.82564992009924],
//               [-122.48129367828368, 37.82629397920697],
//               [-122.48240947723389, 37.82544653184479],
//               [-122.48373985290527, 37.82632787689904],
//               [-122.48425483703613, 37.82680244295304],
//               [-122.48605728149415, 37.82639567223645],
//               [-122.4898338317871, 37.82663295542695],
//               [-122.4930953979492, 37.82415839321614],
//               [-122.49700069427489, 37.821887146654376],
//               [-122.4991464614868, 37.82171764783966],
//               [-122.49850273132326, 37.81798857543524],
//               [-122.50923156738281, 37.82090404811055],
//               [-122.51232147216798, 37.823344820392535],
//               [-122.50150680541992, 37.8271414168374],
//               [-122.48743057250977, 37.83093781796035],
//               [-122.48313903808594, 37.82822612280363],
//               [-122.48043537139893, 37.82564992009924],
//             ],
//           ],
//         },
//       },
//     ],
//   };
// }