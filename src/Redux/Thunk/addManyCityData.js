import { widgetWeatherAddMany, widgetWeatherAddManyDaily, widgetWeatherAddManyHourly, widgetWeatherAddManyWeekly } from '../Actions/widgetWeatherAddMany.js'
import { weatherTypes } from '../Reducers/widgetsData.js'

import weatherApi from '../../Services/WeatherAPI.js'

const dailyProcess = (data, dispatch, idList) => {
  dispatch(widgetWeatherAddManyDaily.SUCCESS({ weatherDataList: data }))
  dispatch(widgetWeatherAddManyHourly.REQUEST({ idList }))
  dispatch(widgetWeatherAddManyWeekly.REQUEST({ idList }))
  const coordList = data.map(el => el.coord)
  return Promise.all([
    weatherApi.getHourlyDataList({ coordList }),
    weatherApi.getWeeklyDataList({ coordList })
  ])
}

const dailyErrorProccess = (e, dispatch) => {
  dispatch(widgetWeatherAddManyDaily.ERROR({ error: e.message }))
}

const hourlyWeeklyProcess = (data, dispatch) => {
  const [ dataHourly, dataWeekly ] = data
  dispatch(widgetWeatherAddManyHourly.SUCCESS({ weatherDataList: dataHourly }))
  dispatch(widgetWeatherAddManyWeekly.SUCCESS({ weatherDataList: dataWeekly }))
}

const hourlyWeeklyErrorProcess = (e, dispatch) => {
  dispatch(widgetWeatherAddManyHourly.ERROR({ error: e.message }))
  dispatch(widgetWeatherAddManyWeekly.ERROR({ error: e.message }))
}

const fulfillALl = dispatch => {
  dispatch(widgetWeatherAddManyDaily.FULFILL())
  dispatch(widgetWeatherAddManyHourly.FULFILL())
  dispatch(widgetWeatherAddManyWeekly.FULFILL())
}

export const addManyCityData = ({ idList }) => {
  return (dispatch) => {
    dispatch(widgetWeatherAddManyDaily.REQUEST({ idList }))

    return weatherApi.getDailyDataList({ idList })
      .then(data => dailyProcess(data, dispatch, idList))
      .catch(e => dailyErrorProccess(e, dispatch))
      .then(data => hourlyWeeklyProcess(data, dispatch))
      .catch(e => hourlyWeeklyErrorProcess(e, dispatch))
      .finally(() => fulfillALl(dispatch))
      
  }
}
