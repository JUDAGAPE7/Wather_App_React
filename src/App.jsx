import { useEffect, useRef, useState } from 'react'
import './App.css'
import axios from 'axios'
import WheateCard from './components/WeatherCard'
import './components/WeatherCard.css'
import UseDynamicBackground  from "./components/UseDynamicBackground";


function App() {
  const [coords, setCoords] = useState() 

  const [weather, setWeather] = useState()
  
  const [temp, setTemp] = useState() 

  const [isloading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [showMessage, setshowMessage] = useState(false) 
  const [countryName, setCountryName] = useState('')
  const [flagName, setFlagName] = useState()

  useEffect(() => {  

    setTimeout(() => { 

      setshowMessage(true)
      
    }, 1000);

    const success = pos =>{
      

      setCoords({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      })

    }

    const error = () =>{ 
      setHasError(true)
      setIsLoading(false)

    }

    navigator.geolocation.getCurrentPosition(success, error)

  }, []) 

  useEffect(() => {
    if(coords){ 

      const API_KEY = '18fbac41584f1198c9b3acb8c37ce587'


     const url  = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
      axios.get(url)
      .then((result) => {
          setWeather(result.data)
          const celsius = (result.data.main.temp - 273.15).toFixed(1) 
          const fahrenheit = ((celsius *  9/5 ) + 32).toFixed(1)
          setTemp({celsius, fahrenheit})
          setCountryName(result.data.sys.country);
        
          
      })

      .catch((err) => {
        console.log(err);
      })

      .finally(() => {setIsLoading(false)
      });
    }

  }, [coords])
  
  
  

  useEffect(() => { 
    if(countryName) {
      const url1 = `https://restcountries.com/v3.1/alpha/${countryName}`
      axios.get(url1)
      .then((res) => { 
        setFlagName(res.data)
       
      }).catch((err) => {
          console.log(err);
      });
    }
  
}, [countryName])  



 const getBackgroundClass = UseDynamicBackground();







  return (
    <div className={`app ${getBackgroundClass()}`}>
    
  
{
  isloading
      ? ( 
          <div>
           ( <h1 className='loading'>Loadin...</h1>)
            {
              showMessage && <p className='allow'> Por favor permite la ubicación</p>
            }
          </div>
)
    : ( 
      hasError? <h1 className='allow'>No bloquees la ubicacion para conocer el clima de tu ciudad</h1> 
      : (
      <WheateCard 
      weather={weather} 
      temp = {temp}
      countryName= {countryName}
      flagName = {flagName}
      /> 
    )
  )

 
  
}  



</div>
  )
}


export default App
