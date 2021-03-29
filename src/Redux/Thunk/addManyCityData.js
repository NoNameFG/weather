import { widgetWeatherAddMany } from '../Actions/widgetWeatherAddMany.js'
import { weatherTypes } from '../Reducers/widgetsData.js'

import weatherApi from '../../Services/WeatherAPI.js'


export const addManyCityData = ({ idList }) => {
  return (dispatch) => {
    dispatch(widgetWeatherAddMany.REQUEST({
      weatherType: weatherTypes.dailyWeather,
      idList
    }))
    
    return weatherApi.getDailyDataList({ idList })
      .then(data => {
        dispatch(widgetWeatherAddMany.SUCCESS({
          weatherDataList: data,
          weatherType: weatherTypes.dailyWeather
        }))

        dispatch(widgetWeatherAddMany.REQUEST({
          weatherType: weatherTypes.hourlyWeather,
          idList
        }))
        dispatch(widgetWeatherAddMany.REQUEST({
          weatherType: weatherTypes.weeklyWeather,
          idList
        }))

        const coordList = data.map(el => el.coord)

        return Promise.all([
          weatherApi.getHourlyDataList({ coordList }),
          weatherApi.getWeeklyDataList({ coordList })
        ])
      })
      .catch(e => {
        dispatch(widgetWeatherAddMany.ERROR({
          weatherType: weatherTypes.dailyWeather,
          error: e.message
        }))
      })
      .then(data => {
        const [ dataHourly, dataWeekly ] = data

        dispatch(widgetWeatherAddMany.SUCCESS({
          weatherDataList: dataHourly,
          weatherType: weatherTypes.hourlyWeather
        }))
        dispatch(widgetWeatherAddMany.SUCCESS({
          weatherDataList: dataWeekly,
          weatherType: weatherTypes.weeklyWeather
        }))
      })
      .catch(e => {
        dispatch(widgetWeatherAddMany.ERROR({
          weatherType: weatherTypes.hourlyWeather,
          error: e.message
        }))
        dispatch(widgetWeatherAddMany.ERROR({
          weatherType: weatherTypes.weeklyWeather,
          error: e.message
        }))
      })
      .finally(() => {
        dispatch(widgetWeatherAddMany.FULFILL({weatherType: weatherTypes.dailyWeather}))
        dispatch(widgetWeatherAddMany.FULFILL({weatherType: weatherTypes.hourlyWeather}))
        dispatch(widgetWeatherAddMany.FULFILL({weatherType: weatherTypes.weeklyWeather}))
      })
  }
}
