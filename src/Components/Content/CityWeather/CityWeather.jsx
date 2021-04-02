import WeatherClock from './WeatherClock/WeatherClock.jsx'
import DailyWeeklyWeather from './DailyWeeklyWeather/DailyWeeklyWeather.jsx'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './CityWeather.scss'
import Preloader from '../../Preloader/Preloader.jsx'
import withHeader from '../../HOC/withHeader.jsx'


const CityWeather = () => {
  const location = useLocation()
  const cityID = new URLSearchParams(location.search).get('id')

  let loading = true

  const isLoading = useSelector(state => {
    let city = state.widgetsData.find(el => {
      return el.dailyWeather.id === Number(cityID)
    })
    return city ? city.dailyWeather.loading : true
  })

  return(
    <div className="city-weather">
      <Link to="/" className="city-weather__home-btn">To home</Link>

      {
        isLoading ?
          <Preloader className="city-weather__preloader"/>
          :
          <>
            <WeatherClock cityID={cityID}/>
            <DailyWeeklyWeather cityID={cityID}/>
          </>
      }
    </div>
  )
}

export default withHeader(CityWeather)
