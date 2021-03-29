import React from 'react'
import './WeatherWidgets.scss'
import WidgetTemplate from './WidgetTemplate/WidgetTemplate.jsx'
import { useSelector } from 'react-redux'

const WeatherWidgets = () => {
  const cityList = useSelector(state => state.widgetsData)

  const widgetList = cityList.map(el => (
    el.dailyWeather.loading ?
      null
    :
      <WidgetTemplate
        key={ 'widget-' + el.dailyWeather?.weatherData?.id }
        dailyWeather={ el.dailyWeather }
        hourlyWeather={ el.hourlyWeather }
        weeklyWeather={ el.weeklyWeather }
      />

  ))

  return(
    <>
      <div className="city-search">
        <input type="text" placeholder="City name..."/>
      </div>
      <div className="weather">
        { widgetList }
      </div>
    </>
  )
}

export default WeatherWidgets
