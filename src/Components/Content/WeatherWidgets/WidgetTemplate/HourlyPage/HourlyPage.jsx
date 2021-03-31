import React from 'react'
import HourlyPageSection from './HourlyPageSection/HourlyPageSection.jsx'
import HourlyPageTimer from './HourlyPageTimer.jsx';

const HourlyPage = ({ hourlyWeather }) => {
  const weatherListRend = hourlyWeather.weatherData.map((el, index) => {
    return(
      <HourlyPageSection
        key={ new Date(el.date).getTime() }
        hour={index}
        iconCode={el.weather.icon}
        weatherCode={el.weather.id}
        temperature={el.temp}
      />
    )
  })

  return(
    <div className="weather__template-hourly">
      <HourlyPageTimer/>

      <div className="weather__template-hourly__range">
        { weatherListRend }
      </div>
    </div>
  )
}

export default HourlyPage
