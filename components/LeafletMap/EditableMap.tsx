import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-draw/dist/leaflet.draw.css'
import { FeatureGroup, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { locationsType } from '../../pages/api/starterSet'
import { EditControl } from 'react-leaflet-draw'
import styles from '../../styles/components/popupForm.module.css'
import L from 'leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { testing, addDrawnFeature } from '../../reduxState/reduxState'
import * as ReactDOM from 'react-dom/client';

interface leafletMapProps {
  locations: locationsType
  drawnLayersRef: any
}

const LeafletMap = ({ locations, drawnLayersRef }:leafletMapProps) => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state: any) => state.currentUser)
  console.log("currentUser", currentUser)

  const createPopupContent = (geoJsonObj: any) => { 
   return (
    <form 
      className={styles.form}
      onSubmit={(event: React.FormEvent<HTMLFormElement> & { target: HTMLFormElement }) => {
        // console.log("FORMSUBMIT FUNC TRIGGERD")
        event.preventDefault()
        const formData = Object.fromEntries(new FormData(event.target));

        dispatch(addDrawnFeature({
          type: geoJsonObj.type,
          properties: {
            userName: currentUser.name,
            userEmail: currentUser.email,
            featureName: formData.name, 
            featureDescr: formData.description,
          },
          geometry: geoJsonObj.geometry
          }))
        }
      }
    >
      <input
        id='popupFormName'
        name='name' 
        placeholder='name...'
        className={styles.inputField}
      />
      <textarea 
        id='popupFormDescr'
        name="description" 
        placeholder="description (max 300 characters)"
        maxLength={300}
        className={styles.inputTextarea}
      />
      <input
        id='submitBtn'
        type='submit'
        name='Submit!'
        />
    </form>
    )
  }
  
  const renderPopupForm = (geoJsonObj: any) => {
    const popup = L.popup();
    const container = L.DomUtil.create('div');
    popup.setContent(container);
    const root = ReactDOM.createRoot(container);
    root.render(createPopupContent(geoJsonObj));
    return popup;
  }

  return (
    <>
      <MapContainer center={[52.5200, 13.4050]} zoom={13} scrollWheelZoom={true} style={{height: 400, width: "100%"}}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FeatureGroup ref={drawnLayersRef}>
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
                  message: '<strong>That is a terrible polygon! Draw that again!' // Message that will show when intersect
                },
                // shapeOptions: {color: '#97009c'}
              }
            }}
            // onEdited={(e) => {
            //   console.log("Pressed Save button in edit bar")
            //   console.log("ONEDITED", e)
            // }}
            onCreated={(e) => {
              const geoJsonObj = e.layer.toGeoJSON()
              const boundPopup = e.layer.bindPopup(renderPopupForm(geoJsonObj), {
                closeButton: false, closeOnClick: false
              })
              boundPopup.openPopup();

            }}
            // onDeleted={() => console.log("onDeleted!")}
            // onMounted={() => console.log("onMounted!")}
            // onEditStart={() => console.log("Edit bar opened")}
            // onEditStop={() => console.log("Pressed Cancel button in Edit Bar")}
            // onDeleteStart={() => console.log("onDeleteStart!")}
            // onDeleteStop={() => console.log("onDeleteStop!")}
            // onDrawStart={() => console.log("onDrawStart!")}
            // onDrawStop={() => console.log("onDrawStop!")}
            // onDrawVertex={() => console.log("onDrawVertex!")}
            // onEditMove={() => console.log("onEditMove!")}
            // onEditResize={() => console.log("onEditResize!")}
            // onEditVertex={() => console.log("onEditVertex!")}
          />
        </FeatureGroup>   
      </MapContainer>
    </>
  )
}

export default LeafletMap