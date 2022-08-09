import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
// import ProfileCard from '../ProfileCard/ProfileCard'
// import './Map.css'

const containerStyle = {
  width: '100%',
  height: '80vh'
};

const center = { lat: 52.5200, lng: 13.4050 }

const Map = () => {


  const [selectedMarker, setselectedMarker] = useState<any>(null)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBGt7x-R0JK3B6wulskJbMLVZ4cAN4Yy4g"
  })


return isLoaded ? (
    <GoogleMap
      center={center}
      zoom={14}
      mapContainerStyle={containerStyle}
      clickableIcons={false}>
    

        <Marker 
          key={1} 
          position={center} 
        />


    </GoogleMap>
) : <></>
}

export default Map;