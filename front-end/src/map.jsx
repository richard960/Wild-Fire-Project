import {React, useMemo, useState} from 'react'
import './map.css'
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import key from './config.js'
import { RotatingLines } from 'react-loader-spinner';



const exampleData = [{lat:40.6486955, lng: -121.5920971}, {lat:40.2822730, lng:-123.3334177}, {lat:34.0362711, lng:-116.8057220}, {lat:33.6261821, lng:-116.7585828}, {lat: 38.2965633, lng:-120.3256975}, {lat:39.1585591, lng:-123.2767054}, {lat:40.3200964, lng:-124.0857888}, {lat:39.6159492,lng: -120.9982728},
{lat:36.0229687, lng:-120.8655202
}]

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
        console.log(result)
        return result
      })
      fetch(`http://209.141.47.144:8080/predictions/${id}`).then((results) => {

        results.json().then((data) => {
          console.log(data)
          // let copy = exampleData.slice();
          setData(data.map((location) => {
            // let random = Math.floor(Math.random() * copy.length);
            // let {lat, lng} = copy[random];
            // copy.splice(random, 1);
            return {...location, lat: location.latitude, lng: location.longitude}
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
            Wildfire Probability = {obj.probability} %
          </div>
          <div>
           Area of damage = {obj.areadamaged} sq ft
          </div>
          {/* <div>
            Rainfall = {obj.rainfall}
          </div> */}
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