import { widgetWeatherAddMany, widgetWeatherAddManyDaily, widgetWeatherAddManyHourly, widgetWeatherAddManyWeekly } from '../Actions/widgetWeatherAddMany.js'
import { weatherTypes } from '../Reducers/widgetsData.js'
import { widgetSetManySettings } from '../Actions/widgetSetManySettings.js'

import weatherApi from '../../Services/WeatherAPI.js'

const dailySuccessProcess = (data, dispatch) => {
  dispatch(widgetWeatherAddManyDaily.SUCCESS({ weatherDataList: data }))
  return data
}

const hourlyWeeklyRequestProcess = (data, dispatch, idList) => {
  dispatch(widgetWeatherAddManyHourly.REQUEST({ idList }))
  dispatch(widgetWeatherAddManyWeekly.REQUEST({ idList }))
  const coordList = data.map(el => el.coord)
  return Promise.all([
    weatherApi.getHourlyDataList({ coordList }),
    weatherApi.getWeeklyDataList({ coordList })
  ])
}

const dailyErrorProcess = (e, dispatch) => {
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
  setTimeout(() => {

    dispatch(widgetWeatherAddManyDaily.FULFILL())
    dispatch(widgetWeatherAddManyHourly.FULFILL())
    dispatch(widgetWeatherAddManyWeekly.FULFILL())

  }, 1000)

}

const setSettingsIfLoggedin = async (dispatch, settingsList) => {
  if(settingsList){
    dispatch(widgetSetManySettings({settingsList}))
  }
}

export const addManyCityData = ({ idList, settingsList }) => {
  return (dispatch) => {
    dispatch(widgetWeatherAddManyDaily.REQUEST({ idList }))

    return weatherApi.getDailyDataList({ idList })
      .then(data => dailySuccessProcess(data, dispatch))
      .then(data => hourlyWeeklyRequestProcess(data, dispatch, idList))
      .catch(e => dailyErrorProcess(e, dispatch))
      .then(data => hourlyWeeklyProcess(data, dispatch))
      .catch(e => hourlyWeeklyErrorProcess(e, dispatch))
      .finally(() => {
        fulfillALl(dispatch)
        setSettingsIfLoggedin(dispatch, settingsList)
      })

  }
}
