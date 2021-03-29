import React from 'react'
import backgroundColorIndicatorHourly from '../../../../../../Function/backgroundColorIndicatorHourly.js'
import { iconCodeURLconvert } from '../../../../../../Function/iconCodeURLconvert.js'

const HourlyPageSection = ({ hour, iconCode, weatherCode, temperature }) => {
  return(
    <div className="weather__template-hourly__range-hour">
      <div className="weather__template-hourly__range-hour__time">
        { hour }
        <span style={{background: backgroundColorIndicatorHourly(weatherCode)}}></span>
      </div>
      <div className="weather__template-hourly__range-hour__info">
        <div className="weather__template-hourly__range-hour__info-time">
          { hour }:00
        </div>
        <div className="weather__template-hourly__range-hour__info-icon">
          <img src={ iconCodeURLconvert(iconCode) } alt="weather_icon"/>
        </div>
        <div className="weather__template-hourly__range-hour__info-temperature">
          {Math.round(temperature)} °C
        </div>
      </div>
    </div>
  )
}

export default HourlyPageSection
