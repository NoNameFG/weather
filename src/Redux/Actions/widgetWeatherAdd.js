import { WIDGET_WEATHER_ADD_DAILY, WIDGET_WEATHER_ADD_HOURLY, WIDGET_WEATHER_ADD_WEEKLY } from '../Constants/constants.js'
import { createAction } from './createAction/createAction.js'

export const widgetWeatherAddDaily = createAction(WIDGET_WEATHER_ADD_DAILY)
export const widgetWeatherAddHourly = createAction(WIDGET_WEATHER_ADD_HOURLY)
export const widgetWeatherAddWeekly = createAction(WIDGET_WEATHER_ADD_WEEKLY)
