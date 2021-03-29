import DailySection from './DailySection/DailySection.jsx'
import WeeklyItem from './WeeklyItem/WeeklyItem.jsx'
import { useSelector } from 'react-redux'

const DailyWeeklyWeather = ({ cityID }) => {
  const { dailyWeather, weeklyWeather } = useSelector(state => {
    const data = state.widgetsData.find(el => el?.dailyWeather?.weatherData?.id === Number(cityID))
    return {
      dailyWeather: data?.dailyWeather?.weatherData,
      weeklyWeather: data?.weeklyWeather?.weatherData
    }
  })

  const weeklyList = () => weeklyWeather.map(el => (
    <WeeklyItem
      key={ el.date.getTime() }
      date={ el.date }
      temperature={ el.temp }
      iconCode={ el.weather.icon }
      condition={ el.weather.description }
    />
  ))

  return(
    <div className="city-weather__container">
      {
        dailyWeather
          &&
        <DailySection
          indicators={{
            temperature: dailyWeather.temperature,
            condition: dailyWeather.weather.description,
            wind: dailyWeather.wind,
            pressure: dailyWeather.pressure,
            humidity: dailyWeather.humidity
          }}
          cityName={ dailyWeather.name }
          iconCode={ dailyWeather.weather.icon }
        />
      }
      <div className="city-weather__container-weekly">
        { weeklyWeather && weeklyList() }
      </div>
    </div>
  )
}

export default DailyWeeklyWeather
