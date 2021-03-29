import { iconCodeURLconvert } from '../../../../../Function/iconCodeURLconvert.js'
import Indicator from './Indicator/Indicator.jsx'

const DailySection = ({ cityName, indicators, iconCode }) => {
  const { temperature, condition, wind, pressure, humidity } = indicators

  console.log(indicators)

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
          <img src={iconCodeURLconvert(iconCode, true)} alt="weather_icon"/>
        </div>
      </div>
      <div className="city-weather__container-daily__indicators">
        <div className="city-weather__container-daily__indicators-date">
          { getDate() }
        </div>

        <Indicator units=" °C" value={Math.round(temperature)} name="Temperature" />
        <Indicator units="" value={condition} name="Condition" />
        <Indicator units=" m/s" value={wind} name="Wind" />
        <Indicator units="%" value={humidity} name="Humidity" />
        <Indicator units=" N/m2" value={pressure} name="Pressure" />
      </div>
    </div>
  )
}

export default DailySection
