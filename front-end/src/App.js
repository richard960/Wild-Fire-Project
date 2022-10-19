import './App.css';
import map from './mapus.jpeg'
function App() {
  return (
    <div className="App">
        <img id='map' src={map}></img>
      <div id='predict'>
        <label for='prediction'>Select A Date For Prediction</label>
        <input type='date' id='prediction'></input>
      </div>
    </div>
  );
}

export default App;
