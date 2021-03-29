import { iconCodeURLconvert } from '../../../../../Function/iconCodeURLconvert.js'

const WeatherClockSection = ({ temperature, weather, hour }) => {
  return (
    <div className="city-weather__weather-clock__range-wrapper-section">
      <div className="city-weather__weather-clock__range-wrapper-section-time">
        { hour }:00
      </div>
      <div className="city-weather__weather-clock__range-wrapper-section-image">
        <img
          src={iconCodeURLconvert(weather.icon, true)}
          alt="weather_icon"
        />
      </div>
      <div className="city-weather__weather-clock__range-wrapper-section-temperature">
        <span>Temperature:</span>
        { Math.round(temperature) } °C
      </div>
    </div>
  )
}

export default WeatherClockSection
