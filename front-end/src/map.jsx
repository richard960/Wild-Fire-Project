import React from 'react'
import map from './mapus.jpeg'
const Map = () => {
 return(<>
   <img id='map' src={map}></img>
      <div id='predict'>
        <label for='prediction'>Select A Date For Prediction</label>
        <input type='date' id='prediction'></input>
      </div>
  </>)
}

export default Map