import {React, useMemo} from 'react'
import './map.css'
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import key from './config.js'
import { RotatingLines } from 'react-loader-spinner';



const exampleData = [{lat:46.680672,	lng:-68.023521}, {lat:37.569199,	lng: -84.299782}, {lat:41.483845,	lng:-87.063965}, {lat: 30.487400,	lng: -95.987228}]

const Map = () => {
  const center = useMemo(() => ({lat: 44, lng: -100}), []);

  const {isLoaded} = useLoadScript({
    googleMapsApiKey: key
  })

  if(!isLoaded) {
    return(<div style={{height: '100vh', display:'flex',
    'justify-content': 'center'}}>
      <RotatingLines
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="0.75"
      width="96"
      visible={true}
    />
    </div>
    )
  }

 return(
  <GoogleMap zoom={4.5} center={center} id='map'>
    {exampleData.map((location) =>
     <MarkerF position={{lat: location.lat, lng: location.lng}}></MarkerF>
    )}
  </GoogleMap>
  )
}

export default Map