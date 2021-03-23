import React from 'react'
import { useSelector } from 'react-redux'
import HourlyPageSection from './HourlyPageSection/HourlyPageSection.jsx'
import HourlyPageTimer from './HourlyPageTimer.jsx';
import shortid from 'shortid'

const HourlyPage = ({ cityID }) => {
  const weatherList = useSelector(state => state.widgetsData.hourlyWeather[cityID])


  const weatherListRend = weatherList.map((el, index) => {
    return(
      <HourlyPageSection
        key={shortid.generate()}
        hour={index}
        iconCode={el.weather.icon}
        weatherCode={el.weather.id}
        temperature={el?.temp}
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
