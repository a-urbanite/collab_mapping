import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-draw/dist/leaflet.draw.css";
import { FeatureGroup, MapContainer, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";
import styles from "../../pages/home/Home.module.css";

const LeafletMap = ({ locations }: any) => {
  console.log(locations);

  return (
    <>
      <MapContainer center={[52.52, 13.405]} zoom={13} scrollWheelZoom={true} className={styles.mapContainer}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location: any) => {
          const timeObj = Date.parse(location.properties.creationDate);
          const date = new Date(timeObj).toLocaleDateString();

          return (
            <GeoJSON data={location} key={location.properties.firebaseDocID}>
              <Popup>
                <b>{location.properties.featureName}</b>
                <br />
                <b>description:</b> {location.properties.featureDescr}
                <br />
                {/* userID: {location.properties.firebaseUserID}
              <br />  */}
                <b>user name:</b> {location.properties.userName}
                <br />
                <b>creation date:</b> {date}
              </Popup>
            </GeoJSON>
          );
        })}
      </MapContainer>
    </>
  );
};

export default LeafletMap;
