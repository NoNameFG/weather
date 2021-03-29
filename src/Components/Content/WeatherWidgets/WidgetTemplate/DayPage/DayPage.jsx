import React from 'react'
import { Link } from 'react-router-dom'
import backgroundImageWidgetConverter from '../../../../../Function/backgroundImageWidgetConverter.js'

const DayPage = ({ dailyWeather }) => {
  const windyCalc = () => {
    if(!(dailyWeather?.weatherData?.wind + '').includes('.')) {
      return dailyWeather?.weatherData?.wind + '.0'
    }
    return dailyWeather?.weatherData?.wind
  }



  const nowDate = () => {
    let date = new Date()
    let month = date.toLocaleString('en-US', { month: 'long' })
    let day = date.getDate()
    return `${month} ${day}`
  }

  const weatherImageURL = () => {
    return `/image/widgetBackground/${backgroundImageWidgetConverter(dailyWeather?.weatherData?.weather.id)}.jpeg`
  }

  return(
    <div
      className="weather__template-indicators"
      style={{
        backgroundImage: `URL(${weatherImageURL()})`
      }}
    >
      <Link
        to={`/city?id=${dailyWeather?.weatherData?.id}`}
        className="weather__template-indicators__city"
      >
        {dailyWeather?.weatherData?.name}
      </Link>
      <div className="weather__template-indicators__temperature">
        { Math.round(dailyWeather?.weatherData?.temperature) } °C
      </div>
      <div className="weather__template-indicators__secondary">
        <div className="weather__template-indicators__secondary-wind">{windyCalc()} m/sec</div>
        <div className="weather__template-indicators__secondary-date">{nowDate()}</div>
      </div>
    </div>
  )
}

export default DayPage
