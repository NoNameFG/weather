import { WIDGET_WEATHER_ADD_MANY_DAILY, WIDGET_WEATHER_ADD_MANY_HOURLY, WIDGET_WEATHER_ADD_MANY_WEEKLY } from '../Constants/constants.js'
import { createAction } from './createAction/createAction.js'

export const widgetWeatherAddManyDaily = createAction(WIDGET_WEATHER_ADD_MANY_DAILY)
export const widgetWeatherAddManyHourly = createAction(WIDGET_WEATHER_ADD_MANY_HOURLY)
export const widgetWeatherAddManyWeekly = createAction(WIDGET_WEATHER_ADD_MANY_WEEKLY)
