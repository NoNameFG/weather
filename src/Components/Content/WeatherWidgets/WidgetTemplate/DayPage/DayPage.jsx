import React from 'react'
import { Link } from 'react-router-dom'
import backgroundImageWidgetConverter from '../../../../../Function/backgroundImageWidgetConverter.js'
import Favorite from './Favorite/Favorite.jsx'
import { useSelector } from 'react-redux'

const DayPage = ({ dailyWeather, isFavorite }) => {

  const windyCalc = () => {
    if(!(dailyWeather?.wind + '').includes('.')) {
      return dailyWeather?.wind + '.0'
    }
    return dailyWeather?.wind
  }



  const nowDate = () => {
    let date = new Date()
    let month = date.toLocaleString('en-US', { month: 'long' })
    let day = date.getDate()
    return `${month} ${day}`
  }

  const weatherImageURL = () => {
    return `/image/widgetBackground/${backgroundImageWidgetConverter(dailyWeather?.weather.id)}.jpeg`
  }

  return(
    <div
      className="weather__template-indicators"
      style={{
        backgroundImage: `URL(${weatherImageURL()})`
      }}
    >
      <Link
        to={`/city?id=${dailyWeather?.id}`}
        className="weather__template-indicators__city"
      >
        {dailyWeather?.name}
      </Link>

      <Favorite isFavorite={isFavorite} cityID={dailyWeather.id}/>

      <div className="weather__template-indicators__temperature">
        { Math.round(dailyWeather?.temperature) } °C
      </div>
      <div className="weather__template-indicators__secondary">
        <div className="weather__template-indicators__secondary-wind">{windyCalc()} m/sec</div>
        <div className="weather__template-indicators__secondary-date">{nowDate()}</div>
      </div>
    </div>
  )
}

export default DayPage
