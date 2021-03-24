import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import shortid from 'shortid'
import WeatherClockSection from './WeatherClockSection/WeatherClockSection.jsx'

const WeatherClock = ({ cityID }) => {
  const [ listPosition, setListPosition ] = useState('0px')
  const [ currentTime, setCurrentTime ] = useState('0:00')


  let hoursList = []
  const hoursData = useSelector(state => state.widgetsData.hourlyWeather[cityID])

  if(hoursData){
    hoursList = hoursData
  }

  const getTime = () => {
    const nowTime = new Date()
    let timeStr = ''
    timeStr += nowTime.getHours()
    timeStr += ':'
    timeStr += nowTime.getMinutes() < 10 ? '0' + nowTime.getMinutes() : nowTime.getMinutes()

    setCurrentTime(timeStr)
  }

  const positionOffset = () => {
    const nowTime = new Date()
    const secFromDayBegin = nowTime.getSeconds() + (60 * (nowTime.getMinutes() + (60 * nowTime.getHours())))
    const positionPerSec = 2400 / 86400

    setListPosition(positionPerSec * secFromDayBegin + 'px')
  }

  useEffect(() => {
    positionOffset()
    getTime()
    const positionChange = setInterval(() => {
      positionOffset()
      getTime()
    }, 1000)
    return () => {
      clearInterval(positionChange)
    }
  }, [])

  const hoursListRend = hoursList.map((el, index) => (
    <WeatherClockSection
      key={shortid.generate()}
      hour={index}
      temperature={el.temp}
      weather={el.weather}
    />
  ))

  return(
    <div className="city-weather__weather-clock">
      <div className="city-weather__weather-clock__range">
        <div
          style={{left: `calc(50% - ${listPosition})`}}
          className="city-weather__weather-clock__range-wrapper"
        >
          { hoursListRend }
        </div>
      </div>
      <span className="city-weather__weather-clock__pointer"></span>
      <div className="city-weather__weather-clock__current-time">
        { currentTime }
      </div>
    </div>
  )
}

export default WeatherClock
