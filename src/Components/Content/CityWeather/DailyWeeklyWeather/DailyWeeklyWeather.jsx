import DailySection from './DailySection/DailySection.jsx'
import WeeklyItem from './WeeklyItem/WeeklyItem.jsx'
import { useSelector } from 'react-redux'
import shortid from 'shortid'

const DailyWeeklyWeather = ({ cityID }) => {
  const dailyWeather = useSelector(state => state.widgetsData.dailyWeather[cityID])
  const weeklyWeather = useSelector(state => state.widgetsData.weeklyWeather[cityID])

  console.log(weeklyWeather)

  const weeklyList = () => weeklyWeather.map(el => (
    <WeeklyItem
      key={ shortid.generate() }
      date={ el.date }
      temperature={ el.temp }
      iconCode={ el.weather.icon }
      condition={ el.weather.description }
    />
  ))

  return(
    <div className="city-weather__container">
      {
        dailyWeather ?
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
          :
          null
      }
      <div className="city-weather__container-weekly">

        {
          weeklyWeather ?
            weeklyList()
            :
            null
        }

      </div>
    </div>
  )
}

export default DailyWeeklyWeather
