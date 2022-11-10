import './App.css';
import LandingPage from './landingPage.jsx'
import map from './mapus.jpeg'
function App() {
  return (
    <div className="App">
      <LandingPage/>
        {/* <img id='map' src={map}></img>
      <div id='predict'>
        <label for='prediction'>Select A Date For Prediction</label>
        <input type='date' id='prediction'></input>
      </div> */}
    </div>
  );
}

export default App;
