import {React, useMemo, useState} from 'react'
import './map.css'
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import key from './config.js'
import { RotatingLines } from 'react-loader-spinner';



const exampleData = [{lat:46.680672,	lng:-68.023521}, {lat:37.569199,	lng: -84.299782}, {lat:41.483845,	lng:-87.063965}, {lat: 30.487400,	lng: -95.987228}]

const Map = () => {
  const center = useMemo(() => ({lat: 44, lng: -100}), []);
  const [slideIn, setSlideIn] = useState(false);
  const [date, setDate] = useState('');
  const [degree, setDegree] = useState('');
  const [humidity, setHumidity] = useState('');

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
  <div id='map-container'>
      <div id='sideMenu' className={slideIn ? 'slideIn' : ''}>
        <h1>Hello world</h1>
      </div>
     <div id='predict'>
        <label for='prediction'>Select A Date For Prediction</label>
        <input type='date' id='prediction' onChange={(e) => setDate(e.target.value)}></input>
        <label for='temp'>Enter Average Temperature in Fahrenheit</label>
        <input type='number' id='temp' onChange={(e) => setDegree(e.target.value)}></input>
        <label for='humidity'>Enter Average Humidity</label>
        <input type='number' id='humidity' onChange={(e) => setHumidity(e.target.value)}></input>
        <input type = "button" id="predictbutton" value ="Predict"></input>
      </div>
      <GoogleMap zoom={4.5} center={center} id='map'>
        {exampleData.map((location) =>
        <MarkerF onClick={() => {
          setSlideIn(!slideIn)
        }} position={{lat: location.lat, lng: location.lng}}></MarkerF>
        )}
      </GoogleMap>
  </div>
  )
}

export default Map