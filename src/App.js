import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {useState} from "react";

function App() {
  
  const apiKey = "d313529f5d515089fc34ceffb108ea4b";
  const [inputCity, setInputCity] = useState("") 
  const [data, setData] = useState({})

  const getTemp = (cityName) => {
    if (!cityName) return
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
    axios.get(apiUrl)
      .then((res) => {
        console.log("response", res.data)
        setData(res.data)
      }).catch((err) => {
        console.log("err", err)
      })
  }

  const handleChangeInput = (e) => {
    setInputCity(e.target.value)  //doubt: why target.value
  }

  const handleSearch = () => {
    getTemp(inputCity)
  }

  return (
    <div className="col-md-12 parent">
      <div className="weatherbg">
        <h1 className="heading">Weather App</h1>
      
        <div className="d-grid gap-2 col-4">
          <input type="text" className="form-control"
           value={inputCity} onChange={handleChangeInput}/>
          <button type="submit" className="btn btn-primary"
           onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div className="col-md-12 text-center mt-5">
        <div className="shadow rounded weatherResultbox">
          <img className="weatherIcon" src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" alt="nothing"/>
          <h5 className="weatherCity">{data?.name}</h5>
          <h6 className="weatherTemp">{((data?.main?.temp) - 273.15).toFixed(2)}°C</h6>
        </div>
      </div> 
    </div>
  );
}

export default App;
