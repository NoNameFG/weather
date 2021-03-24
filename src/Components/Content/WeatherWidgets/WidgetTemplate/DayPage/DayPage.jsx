import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import backgroundImageWidgetConverter from '../../../../../Function/backgroundImageWidgetConverter.js'

const DayPage = ({cityID}) => {
  const { weather, wind, name, temperature } = useSelector(state => state.widgetsData.dailyWeather[cityID])


  const windyCalc = () => {
    if(!(wind + '').includes('.')) {
      return wind + '.0'
    }
    return wind
  }

  const nowDate = () => {
    let date = new Date()
    let month = date.toLocaleString('en-US', { month: 'long' })
    let day = date.getDate()
    return `${month} ${day}`
  }

  const weatherImageURL = () => {
    return `/image/widgetBackground/${backgroundImageWidgetConverter(weather.id)}.jpeg`
  }

  return(
    <div
      className="weather__template-indicators"
      style={{
        backgroundImage: `URL(${weatherImageURL()})`
      }}
    >
      <Link
        to={`/city?id=${cityID}`}
        className="weather__template-indicators__city"
      >
        {name}
      </Link>
      <div className="weather__template-indicators__temperature">
        { Math.round(temperature) } °C
      </div>
      <div className="weather__template-indicators__secondary">
        <div className="weather__template-indicators__secondary-wind">{windyCalc()} m/sec</div>
        <div className="weather__template-indicators__secondary-date">{nowDate()}</div>
      </div>
    </div>
  )
}

export default DayPage
