import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-draw/dist/leaflet.draw.css'
import { FeatureGroup, MapContainer, Marker, Popup, TileLayer, useMap, GeoJSON } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'
import formStyles from '../../styles/components/popupForm.module.css'
import mapStyles from '../../styles/pages/EditMap.module.css'
import L from 'leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { addDrawnFeature, commitDrawnFeatures, deleteDrawnFeatures } from '../../reduxState/drawSlice'
import * as ReactDOM from 'react-dom/client';
import { useEffect, useRef, useState } from 'react';
import { setLocations } from '../../reduxState/locationsSlice';
import Router from 'next/router';

const LeafletMap = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state: any) => state.currentUser)
  const locations = useSelector((state: any) => state.locations)
  const [mapRef, setMapRef] = useState<any>(null);


  //fetches mylocations
  useEffect( () => {
    if (!currentUser) return;
    const fetchMyLocations = async (uid: any) => {
      const res = await fetch(`http://localhost:3000/api/locations/${uid}`)
      const mylocations = await res.json()
      return mylocations
    }
    fetchMyLocations(currentUser.id)
      .then((mylocations) => dispatch(setLocations(mylocations)))
  }, [])

  //adds click eventlistener on preexisting features
  const onEachExistingFeature = (feature: any, layer: any) => {
    // console.log("MAP REF1: ", mapRef)
    layer.on('click', function (e: any, map: any) {
      // console.log("MAP REF2: ", mapRef)
      renderPopup(e.target, mapRef)
    });
  }

  const createPopupContent = (geoJsonObj: any, drawingID: number, mapRef: any) => { 

    const name = geoJsonObj.properties.featureName
    const descr = geoJsonObj.properties.featureDescr

    return (
      <form 
        className={formStyles.form}
        onSubmit={(event: React.FormEvent<HTMLFormElement> & { target: HTMLFormElement }) => {
          event.preventDefault()
          const formData = Object.fromEntries(new FormData(event.target));

          const currentFeature = {
            type: geoJsonObj.type,
            properties: {
              drawingID: drawingID,
              featureName: formData.name, 
              featureDescr: formData.description,
              userName: currentUser.name,
              userEmail: currentUser.email,
              firebaseUserID: currentUser.id,
              creationDate: Date()
            },
            geometry: geoJsonObj.geometry
          }
          
          dispatch(addDrawnFeature(currentFeature))
          mapRef.closePopup()
          }
        }
      >
        <input
          id='popupFormName'
          name='name' 
          defaultValue={ name ? name : undefined}
          placeholder='Name...'
          className={formStyles.inputField}
        />
        <textarea 
          id='popupFormDescr'
          name="description" 
          defaultValue={ descr ? descr : undefined}
          placeholder={'description (max 300 characters)'}
          maxLength={300}
          className={formStyles.inputTextarea}
        />
        <input
          id='submitBtn'
          type='submit'
          name='Save'
          />
      </form>
    )
  }

  const renderPopup = (layer: any, mapRef: any) => {

    const geoJsonObj = layer.toGeoJSON()
    const drawingID = layer._leaflet_id

    const popup = L.popup();
    const container = L.DomUtil.create('div');
    popup.setContent(container);
    const root = ReactDOM.createRoot(container);
    root.render(createPopupContent(geoJsonObj, drawingID, mapRef));

    const boundPopup = layer.bindPopup(popup, {
      closeButton: false, closeOnClick: false, minWidth: 240, autoPan: true
    })
    boundPopup.openPopup();
  }

  return (
    <>
      <MapContainer 
        center={[52.5200, 13.4050]} 
        zoom={13} 
        scrollWheelZoom={true} 
        className={mapStyles.mapContainer}
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
              renderPopup(e.layer, mapRef)
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
            onEachFeature={onEachExistingFeature}
          />
        )}

      </MapContainer>
    </>
  )
}

export default LeafletMap