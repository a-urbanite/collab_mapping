import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-draw/dist/leaflet.draw.css'
import { FeatureGroup, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { locationsType } from '../../pages/api/starterSet'
import { EditControl } from 'react-leaflet-draw'
import styles from '../../styles/components/popupForm.module.css'
import L from 'leaflet';
import PopupForm from './PopupForm'
import { useDispatch } from 'react-redux';
import { testing } from '../../reduxState/reduxState'
import ReactDOMServer from 'react-dom/server'
import ReactDOM from 'react-dom';


interface leafletMapProps {
  locations: locationsType
  drawnLayersRef: any
}

const LeafletMap = ({ locations, drawnLayersRef }:leafletMapProps) => {
  const dispatch = useDispatch()

  // //creating button and its event listener that dispatches action
  // const button = L.DomUtil.create('button');
  // button.innerHTML = 'Save';
  // button.addEventListener('click', () => { 
  //   console.log(
  //     "eventlistener triggered, input content: ", 
  //     document.getElementById('popupFormName')
  //     )
  //   dispatch(testing())
  // });

  // //creating popupcontent out of simple html form and adding button
  // const container = L.DomUtil.create('div');
  // container.innerHTML = ReactDOMServer.renderToString(<PopupForm/>);
  // container.appendChild(button);

  // //creating custom popup and filling it with custom content
  // const popup = L.popup();
  // popup.setContent(container);

  const popup = L.popup();
  // const marker = L.marker(latlng);
  const container = L.DomUtil.create('div');
  ReactDOM.render(
    <form 
    className={styles.form}
    onSubmit={(event: React.FormEvent<HTMLFormElement> & { target: HTMLFormElement }) => {
      console.log("FORMSUBMIT FUNC TRIGGERD")
      event.preventDefault()
      // console.log(new FormData(event.target))
      const formData = Object.fromEntries(new FormData(event.target));
      console.log(formData)
      }
    }
    >
      <input
        id='popupFormName'
        name='name' 
        placeholder='name...'
        // ref={ref}
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
    </form>,
    container,
  );
  popup.setContent(container);
  // marker.bindPopup(popup);
  // return marker;



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
              console.log("onCreated!", e.layer)
              console.log("CREATED LAYER", e.layer.toGeoJSON())
              e.layer.bindPopup(popup).openPopup();
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