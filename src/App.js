import axios from "axios";
import { useState, useEffect } from "react";
import './App.css';

function App() {

  const [ weather, setWeather ] = useState("")

  const [isWeather, setIsWeather] = useState(true)

  const changeWeather = () => {
    setIsWeather(!isWeather)
  }

  const changeToFarenheit = (temp) => {
    return Math.floor( ( (temp - 273.15) * 9 ) / 5 + 32 )
  }

  const changeToCelsius = (temp) => {
    return Math.floor(  (temp - 273.15)  )
  }



  useEffect( () => {

    const currenPosition = (position) => {
      const latitude = position.coords?.latitude
      const longitude = position.coords?.longitude
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=763c65e69075b1517c35f49a36850b82`)
      .then( (res) => setWeather(res.data))

    }
    console.log(weather)

    navigator.geolocation?.getCurrentPosition(currenPosition)

  }, ['weather']);

  if(weather?.weather?.[0]?.main === 'Drizzle'){
    document.body.style.backgroundImage = `url(https://i.giphy.com/media/xT9GEOg09OuResnZ6g/giphy.gif)`
  }else if(weather?.weather?.[0]?.main === 'Rain'){
    document.body.style.backgroundImage = `url(https://64.media.tumblr.com/475f62ccd3ff499105a79ac8b67711e2/6025a433cd47175f-a3/s540x810/54d94f3aacbb8ceddb42ecf8df32f0db7c493d9f.gifv)`
  }else if(weather?.weather?.[0]?.main === 'Snow'){
    document.body.style.backgroundImage = `url(https://c.tenor.com/h7udV_fxDUoAAAAC/snowing-snow.gif)`
  }else if(weather?.weather?.[0]?.main === 'Thunderstorm'){
    document.body.style.backgroundImage = `url(https://static.onecms.io/wp-content/uploads/sites/35/2017/08/03220738/fb-thunderstorm-asthma.gif)`
  }else if(weather?.weather?.[0]?.main === 'Clouds'){
    document.body.style.backgroundImage = `url(https://i.picsum.photos/id/1064/4236/2819.jpg?hmac=YygzDG22SIIGfbbuoV45bKoBIUguEtto0Jw_YdPDGyY)`
  }else{
    document.body.style.backgroundImage = `url(http://www.spyghana.com/wp-content/uploads/2014/11/sunny-day.jpg)`
  }

  

  return (
    <div className="App">
      <div className="weather-time">
        <div className="weather-cont">
          <h1> WEATHER <span> APP </span>  </h1>
          <img
            src={`http://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png`}
            alt="weather logo"
          />
          <h2>Weather Conditions: <span> {weather?.weather?.[0]?.main} </span> </h2> 
          <h2>Description: <span> {weather?.weather?.[0]?.description} </span> </h2>
          <h3> {weather.name}  <span> {weather.sys?.country} </span> </h3>
          <h2> Clouds: <span> {weather.clouds?.all} % </span> </h2>
          <h2> Wind speed: <span> {weather.wind?.speed} m/s </span> </h2>
          <h2> Pressure: <span> {weather.main?.pressure} hPa </span> </h2>
          <h2> Humidity: <span> {weather.main?.humidity} % </span> </h2>
          <h2> Temperature: <span> {isWeather ? changeToFarenheit(weather.main?.temp) : changeToCelsius(weather.main?.temp) }  {isWeather ? "°F" : "°C" } </span>  </h2>

          <button onClick={changeWeather}>{isWeather ? "Degrees °F / °C" :  "Degrees  °C / °F" }</button>

        </div>
      </div>
    </div>
  );
}

export default App;
