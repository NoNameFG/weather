import { addToLocalStorage } from '../../../Function/manipulateCityLocStor.js'
import { widgetWeatherAddDaily, widgetWeatherAddHourly, widgetWeatherAddWeekly } from '../../Actions/widgetWeatherAdd.js'
import weatherApi from '../../../Services/WeatherAPI.js'
import { api } from '../../../Services/Api.js'
import { call, put, select } from 'redux-saga/effects'



function* dailyProcess({ index, city, existCities, isLoggedin }){
  yield put(widgetWeatherAddDaily.REQUEST({ index }))
  const dataDaily = yield call(weatherApi.getCurrentWeather, city)
  if(!existCities.some(el => el.dailyWeather.id === dataDaily.id)){
    yield put(widgetWeatherAddDaily.SUCCESS({
      weatherData: dataDaily,
      index
    }))

    addToLocalStorage(dataDaily.id)

    if(isLoggedin){
      yield call(api.city.add, {cityID: dataDaily.id})
    }

    return dataDaily
  } else {
    throw new Error('City is already exist')
  }
}

function* hourlyProccess({ index, dataDaily }){
  yield put(widgetWeatherAddHourly.REQUEST({ index }))
  const dataHourly = yield call(weatherApi.getHourlyWeather, dataDaily.coord)
  yield put(widgetWeatherAddHourly.SUCCESS({
    weatherData: dataHourly,
    index
  }))
}

function* weeklyProccess({ index, dataDaily }){
  yield put(widgetWeatherAddWeekly.REQUEST({ index }))
  const dataWeekly = yield call(weatherApi.getWeeklyWeather, dataDaily.coord)
  yield put(widgetWeatherAddWeekly.SUCCESS({
    weatherData: dataWeekly,
    index
  }))
}

function* errorsProccess({ index, error }){
  yield put(widgetWeatherAddDaily.ERROR({
    error: error.message,
    index
  }))
  yield put(widgetWeatherAddHourly.ERROR({
    error: error.message,
    index
  }))
  yield put(widgetWeatherAddWeekly.ERROR({
    error: error.message,
    index
  }))
}

function* fulfillALl({ index }){
  yield put(widgetWeatherAddDaily.FULFILL({ index }))
  yield put(widgetWeatherAddHourly.FULFILL({ index }))
  yield put(widgetWeatherAddWeekly.FULFILL({ index }))
}

function* addNewCity(action){
  const { city } = action.payload
  const { isLoggedin, existCities, index } = yield select(state => ({
    isLoggedin: state.userData.isLoggedin,
    existCities: state.widgetsData,
    index: state.widgetsData.length
  }))
  
  try {
    const dataDaily = yield call(dailyProcess, {index, city, existCities, isLoggedin})
    yield call(hourlyProccess, { index, dataDaily })
    yield call(weeklyProccess, { index, dataDaily })
  } catch (error) {
    yield call(errorsProccess, { index, error })
  } finally {
    yield call(fulfillALl, { index })
  }
}

export default addNewCity
