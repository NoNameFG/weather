import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import WeekDay from './WeekDay.jsx'
import weatherApi from '../../../../../Services/WeatherAPI.js'
import shortid from 'shortid'

const WeekPage = ({ cityID }) => {
  const dayList = useSelector(state => state.widgetsData.weeklyWeather[cityID])

  const renderDayList = dayList.map(el => (
    <WeekDay
      key={shortid.generate()}
      temperature={el.temp}
      date={el.date}
      iconCode={el.weather.icon}
    />
  ))

  return(
    <div className="weather__template-week">
      { renderDayList }
    </div>
  )
}

export default WeekPage
