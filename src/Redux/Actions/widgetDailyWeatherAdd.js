import { WIDGET_DAILY_WEATHER_ADD } from '../Constants/constants.js'

export const widgetDailyWeatherAdd = payload => ({
  type: WIDGET_DAILY_WEATHER_ADD,
  payload: payload
})
