import './App.css';
import LandingPage from './landingPage.jsx'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Map from './map.jsx'
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/map' element={<Map/>}/>
        </Routes>
      </Router>

      <div id='predict'>
        <label for='prediction'>Select A Date For Prediction</label>
        <input type='date' id='prediction'></input>
        <input type = "button" id="predictbutton" value ="Predict"></input>
      </div>
    

    </div>
  );
}

export default App;
