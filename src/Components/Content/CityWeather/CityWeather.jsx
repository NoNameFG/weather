import WeatherClock from './WeatherClock/WeatherClock.jsx'
import DailyWeeklyWeather from './DailyWeeklyWeather/DailyWeeklyWeather.jsx'
import { Link, useLocation } from 'react-router-dom'
import './CityWeather.scss'

const CityWeather = () => {
  const location = useLocation()
  const cityID = new URLSearchParams(location.search).get('id')

  return(
    <div className="city-weather">
      <Link to="/" className="city-weather__home-btn">To home</Link>
      <WeatherClock cityID={cityID}/>
      <DailyWeeklyWeather cityID={cityID}/>
    </div>
  )
}

export default CityWeather
