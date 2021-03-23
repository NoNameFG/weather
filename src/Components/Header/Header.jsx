import React, { useState } from 'react'
import { ReactComponent as SearchSVG } from '../../Dist/Header/SearchSVG.svg'
import './Header.scss'
import weatherApi from '../../Services/WeatherAPI.js'
import { useDispatch, useSelector } from 'react-redux'
import { widgetDailyWeatherAdd } from '../../Redux/Actions/widgetDailyWeatherAdd.js'
import { widgetAddCityID } from '../../Redux/Actions/widgetAddCityID.js'
import { widgetHourlyWeatherAdd } from '../../Redux/Actions/widgetHourlyWeatherAdd.js'
import { widgetWeeklyWeatherAdd } from '../../Redux/Actions/widgetWeeklyWeatherAdd.js'
import { addToLocalStorage } from '../../Function/manipulateCityLocStor.js'

const Header = () => {
  const [ city, setCity ] = useState('')
  const cityWeatherData = useSelector(state => state.widgetsData.dailyWeather)

  const dispatch = useDispatch()

  const addCity = async e => {
    e.preventDefault()
    let dataDaily = await weatherApi.getCurrentWeather(city)
    if(cityWeatherData[dataDaily.id]){
      dispatch(widgetAddCityID({id: dataDaily.id}))
      setCity('')
      return
    }
    if(dataDaily) {
      let dataHorly = await weatherApi.getHourlyWeather(dataDaily.coord)
      let dataWeekly = await weatherApi.getWeeklyWeather(dataDaily.coord)
      dispatch(widgetDailyWeatherAdd({
        cityID: dataDaily.id,
        weatherData: dataDaily
      }))
      dispatch(widgetHourlyWeatherAdd({
        cityID: dataDaily.id,
        weatherData: dataHorly
      }))
      dispatch(widgetWeeklyWeatherAdd({
        cityID: dataDaily.id,
        weatherData: dataWeekly
      }))
      dispatch(widgetAddCityID({id: dataDaily.id}))
      addToLocalStorage(dataDaily.id)
      setCity('')
    }
  }

  const handleChange = e => {
    setCity(e.target.value)
  }

  return(
    <header className="header">
      <form className="header__search" onSubmit={addCity}>
        <div className="header__search-icon">
          <SearchSVG/>
        </div>

        <input
          value={city}
          onChange={handleChange}
          type="text"
          className="header__search-field"
        />

        <button type="submit" className="header__search-button">
          + Add city
        </button>
      </form>
    </header>
  )
}

export default Header
