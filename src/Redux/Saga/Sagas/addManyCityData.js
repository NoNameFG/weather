import { widgetWeatherAddMany, widgetWeatherAddManyDaily, widgetWeatherAddManyHourly, widgetWeatherAddManyWeekly } from '../../Actions/widgetWeatherAddMany.js'
import { widgetSetManySettings } from '../../Actions/widgetSetManySettings.js'
import weatherApi from '../../../Services/WeatherAPI.js'
import { call, put, select, all } from 'redux-saga/effects'


function* dailyProcess({ idList }){
  yield put(widgetWeatherAddManyDaily.REQUEST({ idList }))
  const dataDaily = yield call(weatherApi.getDailyDataList, { idList })
  yield put(widgetWeatherAddManyDaily.SUCCESS({ weatherDataList: dataDaily }))
  return dataDaily
}

function* hourlyProccess({ idList, coordList }){
  yield put(widgetWeatherAddManyHourly.REQUEST({ idList }))
  const dataHourly = yield call(weatherApi.getHourlyDataList, { coordList })
  yield put(widgetWeatherAddManyHourly.SUCCESS({ weatherDataList: dataHourly }))
}

function* weeklyProccess({ idList, coordList }){
  yield put(widgetWeatherAddManyWeekly.REQUEST({ idList }))
  const dataWeekly = yield call(weatherApi.getWeeklyDataList, { coordList })
  yield put(widgetWeatherAddManyWeekly.SUCCESS({ weatherDataList: dataWeekly }))
}

function* errorsProccess({ error }){
  yield put(widgetWeatherAddManyDaily.ERROR({ error: error.message }))
  yield put(widgetWeatherAddManyHourly.ERROR({ error: error.message }))
  yield put(widgetWeatherAddManyWeekly.ERROR({ error: error.message }))
}

function* fulfillALl(){
  yield put(widgetWeatherAddManyDaily.FULFILL())
  yield put(widgetWeatherAddManyHourly.FULFILL())
  yield put(widgetWeatherAddManyWeekly.FULFILL())
}

function* setSettingsIfLoggedin({ settingsList }){
  if(settingsList){
    yield put(widgetSetManySettings({ settingsList }))
  }
}

function* addManyCityData(action){
  const { idList, settingsList } = action.payload
  try {
    const dataDaily = yield call(dailyProcess, { idList })
    const coordList = dataDaily.map(el => el.coord)
    yield all([
      call(hourlyProccess, { idList, coordList }),
      call(weeklyProccess, { idList, coordList })
    ])
  } catch (error) {
    yield call(errorsProccess, { error })
  } finally {
    yield call(fulfillALl)
    yield call(setSettingsIfLoggedin, { settingsList })
  }
}

export default addManyCityData
