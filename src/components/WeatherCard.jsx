import { useState } from "react";
//  import './components/WeatherCard.css'


const WheateCard = ({ weather, temp, flagName }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const changeTemperature = () => {
    setIsCelsius(!isCelsius); 
  }; 

  
  const flag = flagName?.[0].flags.png;
  


  return ( 
    
    <article className="card">
      
      <div className="card__title">
        
        <h1>Weather App</h1>
        <div className="country__line">
        <h2 className="card__country">
          {weather?.name}, {weather?.sys.country}
        </h2> 
        <img className="image__country" src={flag} alt="" />
        </div>
        <section className="card__body">
          <div className="card__image-container">
            <img
              className="card__image"
              src={
                weather &&
                `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
              }
              alt=""
            />
          </div>
       
        <article className="info">
          <h3 className="info__title">{weather?.weather[0].description}</h3>

          <ul className="info__list">
            <li className="info__item">
              <span className="info__label">Wind speed</span>
              <span className="info__value">{weather?.wind.speed}m/s</span>
            </li>
            <li className="info__item">
              <span className="info__label"> Clouds </span>

              <span className="info__value">{weather?.clouds.all}%</span>
            </li>
            <li className="info__item">
              <span className="info__label">Pressure: </span>
              <span className="info__value">{weather?.main.pressure}hPa</span>
            </li>
          </ul>
        </article>
        </section>
        <h2 className="card__temp">{isCelsius ? `${temp?.celsius}℃` : `${temp?.fahrenheit}℉`}
        </h2>
        <button className="card__btn" onClick={changeTemperature}> Change to {isCelsius ? "℉" : "℃"}
        </button>
      </div>
    </article>
  );
};

export default WheateCard;
