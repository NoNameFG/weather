import React from 'react'
import WeekDay from './WeekDay.jsx'


const WeekPage = ({ weeklyWeather }) => {
  const renderDayList = weeklyWeather?.weatherData.map(el => (
    <WeekDay
      key={new Date(el.date).getTime() }
      temperature={el.temp}
      date={new Date(el.date)}
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
