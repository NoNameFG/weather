import { addToLocalStorage } from '../../Function/manipulateCityLocStor.js'
import { widgetWeatherAddDaily, widgetWeatherAddHourly, widgetWeatherAddWeekly } from '../Actions/widgetWeatherAdd.js'
import { weatherTypes } from '../Reducers/widgetsData.js'
import weatherApi from '../../Services/WeatherAPI.js'


const dailyProcess = (dispatch, index, data, existCities) => {
  if(!existCities.some(el => el.dailyWeather.id === data.id)){
    dispatch(widgetWeatherAddDaily.SUCCESS({
      weatherData: data,
      index
    }))
    addToLocalStorage(data.id)
    dispatch(widgetWeatherAddHourly.REQUEST({ index }))
    dispatch(widgetWeatherAddWeekly.REQUEST({ index }))
    return Promise.all([
      weatherApi.getHourlyWeather(data.coord),
      weatherApi.getWeeklyWeather(data.coord)
    ])
  } else {
    throw new Error('City is already exist')
  }
}

const dailyErrorProccess = (dispatch, index, e) => {
  dispatch(widgetWeatherAddDaily.ERROR({
    error: e.message,
    index
  }))
}

const hourlyWeeklyProcess = (dispatch, index, data) => {
  const [ dataHourly, dataWeekly ] = data
  dispatch(widgetWeatherAddHourly.SUCCESS({
    weatherData: dataHourly,
    index
  }))
  dispatch(widgetWeatherAddWeekly.SUCCESS({
    weatherData: dataWeekly,
    index
  }))
}

const hourlyWeeklyErrorProcess = (dispatch, index, e) => {
  dispatch(widgetWeatherAddHourly.ERROR({
    error: e.message,
    index
  }))
  dispatch(widgetWeatherAddWeekly.ERROR({
    error: e.message,
    index
  }))
}

const fulfillALl = (dispatch, index) => {

  setTimeout(() => {

    dispatch(widgetWeatherAddDaily.FULFILL({ index }))
    dispatch(widgetWeatherAddHourly.FULFILL({ index }))
    dispatch(widgetWeatherAddWeekly.FULFILL({ index }))

  }, 1000)

}

export const addNewCity = ({ index, city, existCities }) => {
  return (dispatch) => {
    dispatch(widgetWeatherAddDaily.REQUEST({ index }))

    return weatherApi.getCurrentWeather(city)
      .then(data => dailyProcess(dispatch, index, data, existCities))
      .catch(e => dailyErrorProccess(dispatch, index, e))
      .then(data => hourlyWeeklyProcess(dispatch, index, data))
      .catch(e => hourlyWeeklyErrorProcess(dispatch, index, e))
      .finally(() => fulfillALl(dispatch, index))
  }
}
