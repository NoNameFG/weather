import { iconCodeURLconvert, iconSource } from '../../../../../Function/iconCodeURLconvert.js'
import WeatherIcon from '../../../../WeatherIcon/WeatherIcon.jsx'

const WeatherClockSection = ({ temperature, weather, hour }) => {
  return (
    <div className="city-weather__weather-clock__range-wrapper-section">
      <div className="city-weather__weather-clock__range-wrapper-section-time">
        { hour }:00
      </div>
      <WeatherIcon
        className="city-weather__weather-clock__range-wrapper-section-image"
        iconCode={weather.icon}
        source={iconSource.BMCDN}
      />
      <div className="city-weather__weather-clock__range-wrapper-section-temperature">
        <span>Temperature:</span>
        { Math.round(temperature) } °C
      </div>
    </div>
  )
}

export default WeatherClockSection
