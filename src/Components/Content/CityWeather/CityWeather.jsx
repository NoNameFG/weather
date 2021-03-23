import WeatherClock from './WeatherClock/WeatherClock.jsx'
import DailyInfo from './DailyInfo/DailyInfo.jsx'
import { Link } from 'react-router-dom'
import './CityWeather.scss'

const CityWeather = () => {
  return(
    <div className="city-weather">
      <Link to="/" className="city-weather__home-btn">To home</Link>
      <WeatherClock/>
      <DailyInfo/>
    </div>
  )
}

export default CityWeather
