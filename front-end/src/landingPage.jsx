import React from 'react'
import './landingPage.css'
import {useNavigate} from 'react-router-dom'
const LandingPage = () => {
  const navigate = useNavigate()
  return(<div id='background'>
    <div id='title-container'>
      <h1>Location-based <br></br> wildfire prediction</h1>
    </div>
    <button id='start-btn' onClick={() => navigate('/map')}>Start Here</button>
  </div>)
}

export default LandingPage