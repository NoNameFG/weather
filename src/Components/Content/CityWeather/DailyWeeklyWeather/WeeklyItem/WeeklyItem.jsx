import { iconCodeURLconvert } from '../../../../../Function/iconCodeURLconvert.js'

const WeeklyItem = ({ date, temperature, iconCode, condition }) => {
  return(
    <div className="city-weather__container-weekly__item">
      <div className="city-weather__container-weekly__item-date">
        {
          `${date.toLocaleString('en-us', { month: 'short' })}. ${date.getDate()}`
        }
      </div>
      <div className="city-weather__container-weekly__item-day">
        { date.toLocaleString('en-us', {weekday:'short'}) }
      </div>
      <div className="city-weather__container-weekly__item-icon">
        <img src={ iconCodeURLconvert(iconCode) } alt="weather_icon"/>
      </div>
      <div className="city-weather__container-weekly__item-condition">
        { condition }
      </div>
      <div className="city-weather__container-weekly__item-temperature">
        {`${Math.round(temperature.max)}/${Math.round(temperature.min)} °C`}
      </div>
    </div>
  )
}

export default WeeklyItem
