import {React, useMemo, useState} from 'react'
import './map.css'
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import key from './config.js'
import { RotatingLines } from 'react-loader-spinner';



const exampleData = [{lat:46.680672,	lng:-68.023521}, {lat:37.569199,	lng: -84.299782}, {lat:41.483845,	lng:-87.063965}, {lat: 30.487400,	lng: -95.987228}, {lat: 33.040619, lng:-83.643074}, {lat:40.349457, lng: -88.986137}, {lat:38.526600, lng:-96.726486}, {lat:36.116203, lng:-119.681564},
{lat:44.572021, lng:-122.070938}, {lat:31.054487, lng:-97.563461}, {lat:40.150032, lng:-111.862434},
{lat:40.388783, lng:-82.764915}]

const Map = () => {
  const center = useMemo(() => ({lat: 44, lng: -100}), []);
  const [slideIn, setSlideIn] = useState(false);
  const [date, setDate] = useState('');
  const [degree, setDegree] = useState('');
  const [humidity, setHumidity] = useState('');
  const [rain30, setRain30] = useState('');
  const [rain60, setRain60] = useState('');
  const [rain90, setRain90] = useState('');
  const [data, setData] = useState([]);
  const [obj, setObj] = useState({});
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

  const getId = () => {
    fetch('http://209.141.47.144:8080/request', {
      method: 'POST',
      body: JSON.stringify({
        avgTemperature: degree,
        avgHumidity: humidity,
        avgRainfall30: rain30,
        avgRainfall60: rain60,
        avgRainfall90: rain90
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    }).then(async (res) => {

      let {id} = await res.json().then((result) => {
        return result
      })
      fetch(`http://209.141.47.144:8080/predictions/${id}`).then((results) => {
        results.json().then((data) => {
          // let copy = exampleData.slice();
          setData(data.map((location) => {
            // let random = Math.floor(Math.random() * copy.length);
            // let {lat, lng} = copy[random];
            // copy.splice(random, 1);
            return {...location, lat:location.latitude, lng: location.longitude}
          }))
        })
      })
    }).catch((err) => {console.log(err)})
  }

 return(
  <div id='map-container'>
      <div id='sideMenu' className={slideIn ? 'slideIn' : ''}>
        <div id='closeContainer'>
         <span onClick={() => setSlideIn(false)} id='close'>&#10005;</span>
        </div>
        <div id='infoContainer'>
          <div>
            City = {obj.city}
          </div>
          <div>
            Wildfire Probability = {obj.probability} %
          </div>
          <div>
            Area of damage = {obj.areadamaged} sq ft
          </div>
          {/*<div>
            Rainfall = {obj.rainfall}
          </div> */ }
        </div> 
      </div>
     <div id='predict'>
        <label for='prediction'>Select A Date For Prediction</label>
        <input type='date' id='prediction' onChange={(e) => setDate(e.target.value)}></input>
        <label for='temp'>Enter Average Temperature in Celsius</label>
        <input type='number' id='temp' onChange={(e) => setDegree(e.target.value)}></input>
        <label for='humidity'>Enter Average Humidity</label>
        <input type='number' id='humidity' onChange={(e) => setHumidity(e.target.value)}></input>
        <label for='rain30'>Enter Average Rainfall 30 days</label>
        <input type='number' id='rain30' onChange={(e) => setRain30(e.target.value)}></input>
        <label for='rain60'>Enter Average Rainfall 60 days</label>
        <input type='number' id='rain60' onChange={(e) => setRain60(e.target.value)}></input>
        <label for='rain90'>Enter Average Rainfall 90 days</label>
        <input type='number' id='rain90' onChange={(e) => setRain90(e.target.value)}></input>
        <input type = "button" onClick={getId} id="predictbutton" value ="Predict"></input>
      </div>
      <GoogleMap zoom={4.5} center={center} id='map'>
        {data.map((location) =>
        <MarkerF onClick={() => {
          setSlideIn(true);
          setObj(location);
        }} position={{lat: location.lat, lng: location.lng}}></MarkerF>
        )}
      </GoogleMap>
  </div>
  )
}

export default Map