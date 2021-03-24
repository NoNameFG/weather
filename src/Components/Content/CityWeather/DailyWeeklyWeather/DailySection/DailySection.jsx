import { iconCodeURLconvert } from '../../../../../Function/iconCodeURLconvert.js'

const DailySection = ({ cityName, indicators, iconCode }) => {
  const { temperature, condition, wind, pressure, humidity } = indicators

  const getDate = () => {
    const date = new Date()
    const month = date.toLocaleString('en-us', { month: 'long' })
    return `${month} ${date.getDate()}`
  }

  return (
    <div className="city-weather__container-daily">
      <div className="city-weather__container-daily__head">
        <div className="city-weather__container-daily__head-city">
          { cityName }
        </div>
        <div className="city-weather__container-daily__head-icon">
          <img src={iconCodeURLconvert(iconCode)} alt="weather_icon"/>
        </div>
      </div>
      <div className="city-weather__container-daily__indicators">
        <div className="city-weather__container-daily__indicators-date">
          { getDate() }
        </div>
        <div className="city-weather__container-daily__indicators-importance">
          <span>Temperature:</span>
          { Math.round(temperature) } °C
        </div>
        <div className="city-weather__container-daily__indicators-importance">
          <span>Condition:</span>
          { condition }
        </div>
        <div className="city-weather__container-daily__indicators-importance">
          <span>Wind:</span>
          { wind } m/s
        </div>
        <div className="city-weather__container-daily__indicators-importance">
          <span>Humidity:</span>
          { humidity }%
        </div>
        <div className="city-weather__container-daily__indicators-importance">
          <span>Pressure:</span>
          { pressure } N/m2
        </div>
      </div>
    </div>
  )
}

export default DailySection
