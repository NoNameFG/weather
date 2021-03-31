import { iconCodeURLconvert } from '../../Function/iconCodeURLconvert.js'

const WeatherIcon = ({ iconCode, source, className }) => {
  return(
    <div className={className}>
      <img
        src={iconCodeURLconvert(iconCode, source)}
        alt="weather_icon"
      />
    </div>
  )
}

export default WeatherIcon
