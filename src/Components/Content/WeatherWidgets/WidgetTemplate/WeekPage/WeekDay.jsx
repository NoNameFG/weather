import React from 'react'
import { iconCodeURLconvert, iconSource } from '../../../../../Function/iconCodeURLconvert.js'
import WeatherIcon from '../../../../WeatherIcon/WeatherIcon.jsx'

const WeekDay = ({temperature, date, iconCode}) => {
  return(
    <div className="weather__template-week__day">
      <div className="weather__template-week__day-date">
        <div>
          { date.toLocaleString('en-us', {weekday:'short'}) }
        </div>
        <div>
          { `${date.toLocaleString('en-us', {month:'short'})}. ${date.getDate()}` }
        </div>
      </div>
      <WeatherIcon
        className="weather__template-week__day-icon"
        iconCode={iconCode}
        source={iconSource.OPENWEATHER}
      />
      <div className="weather__template-week__day-temperature">
        <div>min <span>{ Math.round(temperature.min) } °C</span></div>
        <div>max <span>{ Math.round(temperature.max) } °C</span></div>
      </div>
    </div>
  )
}

export default WeekDay
