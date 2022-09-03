import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-draw/dist/leaflet.draw.css'
import { FeatureGroup, MapContainer, Marker, Popup, TileLayer, useMap, GeoJSON } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'
import styles from './editableMap.module.css'
import L from 'leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { addDrawnFeature, commitDrawnFeatures, deleteDrawnFeatures } from '../../reduxState/drawSlice'
import * as ReactDOM from 'react-dom/client';
import { useEffect, useRef, useState } from 'react';
import { setLocations } from '../../reduxState/locationsSlice';
// import Router from 'next/router';

const LeafletMap = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state: any) => state.currentUser)
  const locations = useSelector((state: any) => state.locations)
  const [mapRef, setMapRef] = useState<any>(null);

// useEffect(() => {
//   if (mapRef) {
//     console.log("MAPREF", mapRef)
//     console.log("PANES", mapRef.getPanes())
//     // console.log(mapRef.getPane('markerPane').children[0])
//   }
// }, [mapRef])


  //fetches mylocations
  useEffect( () => {
    const fetchMyLocations = async (uid: any) => {
      const res = await fetch(`http://localhost:3000/api/locations/${uid}`)
      const mylocations = await res.json()
      return mylocations
    }
    fetchMyLocations(currentUser.id)
      .then((mylocations) => dispatch(setLocations(mylocations)))
  }, [])

  const submitFunc = ( event: any, layer: any) => {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.target));

    const geoJson = layer.toGeoJSON()

    console.log("inside submitFunc: ", event)
    console.log("inside submitFunc LAYER OBJ: ", layer)

    const currentFeature = {
      type: geoJson.type,
      properties: {
        drawingID: layer._leaflet_id,
        featureName: formData.name, 
        featureDescr: formData.description,
        userName: currentUser.name,
        userEmail: currentUser.email,
        firebaseUserID: currentUser.id,
        creationDate: Date()
      },
      geometry: geoJson.geometry
    }
    
    dispatch(addDrawnFeature(currentFeature))
    layer.closePopup()
    }

  //generates the form inside the marker popup
  const createPopupContent = ( layer: any ) => { 

    return (
      <form 
        className={styles.form}
        onSubmit={(e) => submitFunc(e, layer)
        }
      >
        <input
          id='popupFormName'
          name='name' 
          defaultValue={ layer.feature ? layer.feature.properties.featureName : undefined}
          placeholder='Name...'
          className={styles.inputField}
        />
        <textarea 
          id='popupFormDescr'
          name="description" 
          defaultValue={  layer.feature ? layer.feature.properties.featureDescr : undefined}
          placeholder={'description (max 300 characters)'}
          maxLength={300}
          className={styles.inputTextarea}
        />
        <input
          id='submitBtn'
          type='submit'
          name='Save'
          />
      </form>
    )
  }

  //creates and binds popup to marker
  const renderPopup = (layer: any) => {
    const container = L.DomUtil.create('div');
    const popup = L.popup().setContent(container);

    const root = ReactDOM.createRoot(container);
    root.render(createPopupContent(layer));

    layer.bindPopup(popup, {
      closeButton: false, closeOnClick: false, minWidth: 240, autoPan: true
    })

  }

  return (
    <>
      <MapContainer 
        center={[52.5200, 13.4050]} 
        zoom={13} 
        scrollWheelZoom={true} 
        className={styles.mapContainer}
        ref={setMapRef}
        >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <FeatureGroup >
          <EditControl
            position="topright"
            draw={{
              rectangle: false,
              circle: false,
              circlemarker: false,
              polyline: { 
                showLength: true,
                metric: true },
              polygon: {
                allowIntersection: false, // Restricts shapes to simple polygons
                drawError: {
                  color: 'red', // Color the shape will turn when intersects
                  message: '<strong>That is a terrible polygon! Draw that again!' // Message that will show when intersect
                },
                // shapeOptions: {color: '#97009c'}
              }
            }}
            onEdited={(e) => {
              console.log("Pressed Save button in edit bar")
              // console.log("ONEDITED", e)
            }}
            onCreated={(e) => {  
              renderPopup(e.layer)
              e.layer.openPopup() 
              
            }}
            onMounted={() => console.log("onMounted!")}
            onEditStart={() => console.log("Edit bar opened")}
            onEditStop={() => console.log("Pressed Cancel button in Edit Bar")}
            onDeleted={() => {
              console.log("onDeleted!")
              dispatch(deleteDrawnFeatures())
            }}
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

        {locations?.map((location: any) => 
          <GeoJSON 
            data={location} 
            key={location.properties.firebaseDocID}
            onEachFeature={(feature: any, layer: any) => renderPopup(layer) }
          />
        )}

      </MapContainer>
    </>
  )
}

export default LeafletMap