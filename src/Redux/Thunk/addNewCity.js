import { addToLocalStorage } from '../../Function/manipulateCityLocStor.js'
import { widgetWeatherAdd } from '../Actions/widgetWeatherAdd.js'
import { weatherTypes } from '../Reducers/widgetsData.js'
import weatherApi from '../../Services/WeatherAPI.js'


export const addNewCity = ({ index, city, existCities }) => {
  return (dispatch) => {
    dispatch(widgetWeatherAdd.REQUEST({
      weatherType: weatherTypes.dailyWeather,
      index
    }))

    return weatherApi.getCurrentWeather(city)
      .then(data => {
        if(!existCities.some(el => el.dailyWeather.weatherData.id === data.id)){
          dispatch(widgetWeatherAdd.SUCCESS({
            weatherType: weatherTypes.dailyWeather,
            weatherData: data,
            index
          }))

          addToLocalStorage(data.id)

          dispatch(widgetWeatherAdd.REQUEST({
            weatherType: weatherTypes.hourlyWeather,
            index
          }))
          dispatch(widgetWeatherAdd.REQUEST({
            weatherType: weatherTypes.weeklyWeather,
            index
          }))


          return Promise.all([
            weatherApi.getHourlyWeather(data.coord),
            weatherApi.getWeeklyWeather(data.coord)
          ])
        } else {
          throw new Error('City is already exist')
        }
      })
      .catch(e => {
        dispatch(widgetWeatherAdd.ERROR({
          weatherType: weatherTypes.dailyWeather,
          error: e.message,
          index
        }))
      })
      .then(data => {
        const [ dataHourly, dataWeekly ] = data

        dispatch(widgetWeatherAdd.SUCCESS({
          weatherType: weatherTypes.hourlyWeather,
          weatherData: dataHourly,
          index
        }))
        dispatch(widgetWeatherAdd.SUCCESS({
          weatherType: weatherTypes.weeklyWeather,
          weatherData: dataWeekly,
          index
        }))
      })
      .catch(e => {
        dispatch(widgetWeatherAdd.ERROR({
          weatherType: weatherTypes.hourlyWeather,
          error: e.message,
          index
        }))
        dispatch(widgetWeatherAdd.ERROR({
          weatherType: weatherTypes.weeklyWeather,
          error: e.message,
          index
        }))
      })
      .finally(() => {
        dispatch(widgetWeatherAdd.FULFILL({
          weatherType: weatherTypes.dailyWeather,
          index
        }))
        dispatch(widgetWeatherAdd.FULFILL({
          weatherType: weatherTypes.hourlyWeather,
          index
        }))
        dispatch(widgetWeatherAdd.FULFILL({
          weatherType: weatherTypes.weeklyWeather,
          index
        }))
      })
  }
}
