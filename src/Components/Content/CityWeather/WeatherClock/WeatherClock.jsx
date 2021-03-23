const WeatherClock = () => {
  return(
    <div className="city-weather__weather-clock">
      <div className="city-weather__weather-clock__range">
        <div className="city-weather__weather-clock__range-wrapper">
          <div className="city-weather__weather-clock__range-wrapper-section">
            <div className="city-weather__weather-clock__range-wrapper-section-time">
              0:00
            </div>
            <div className="city-weather__weather-clock__range-wrapper-section-image">
              <img
                src="https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/13n.png"
                alt="weather_icon"
              />
            </div>
            <div className="city-weather__weather-clock__range-wrapper-section-temperature">
              <span>Temperature:</span>
              -14 °C
            </div>
          </div>

          <div className="city-weather__weather-clock__range-wrapper-section">
            <div className="city-weather__weather-clock__range-wrapper-section-time">
              0:00
            </div>
            <div className="city-weather__weather-clock__range-wrapper-section-image">
              <img
                src="https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/01n.png"
                alt="weather_icon"
              />
            </div>
            <div className="city-weather__weather-clock__range-wrapper-section-temperature">
              <span>Temperature:</span>
              -14 °C
            </div>
          </div>
          
        </div>
      </div>
      <span className="city-weather__weather-clock__pointer"></span>
      <div className="city-weather__weather-clock__current-time">
        14:20
      </div>
    </div>
  )
}

export default WeatherClock
