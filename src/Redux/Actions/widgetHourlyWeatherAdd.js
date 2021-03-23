import { WIDGET_HOURLY_WEATHER_ADD } from '../Constants/constants.js'

export const widgetHourlyWeatherAdd = (payload) => ({
  type: WIDGET_HOURLY_WEATHER_ADD,
  payload: payload
})
