import { createTypes } from './createTypes/createTypes.js'

export const WIDGET_REMOVE_CITY_ID = 'WIDGET_REMOVE_CITY_ID'

export const WIDGET_MAKE_FAVORITE = 'WIDGET_MAKE_FAVORITE'
export const WIDGET_SET_DISPLAY = 'WIDGET_SET_DISPLAY'
export const WIDGET_SET_MANY_SETTINGS = 'WIDGET_SET_MANY_SETTINGS'

export const WIDGET_WEATHER_ADD_DAILY = 'WIDGET_WEATHER_ADD_DAILY'
export const WIDGET_WEATHER_ADD_HOURLY = 'WIDGET_WEATHER_ADD_HOURLY'
export const WIDGET_WEATHER_ADD_WEEKLY = 'WIDGET_WEATHER_ADD_WEEKLY'
export const WIDGET_WEATHER_ADD_MANY_DAILY = 'WIDGET_WEATHER_ADD_MANY_DAILY'
export const WIDGET_WEATHER_ADD_MANY_HOURLY = 'WIDGET_WEATHER_ADD_MANY_HOURLY'
export const WIDGET_WEATHER_ADD_MANY_WEEKLY = 'WIDGET_WEATHER_ADD_MANY_WEEKLY'



export const widgetWeatherAddDaily = createTypes(WIDGET_WEATHER_ADD_DAILY)
export const widgetWeatherAddHourly = createTypes(WIDGET_WEATHER_ADD_HOURLY)
export const widgetWeatherAddWeekly = createTypes(WIDGET_WEATHER_ADD_WEEKLY)
export const widgetWeatherAddManyDaily = createTypes(WIDGET_WEATHER_ADD_MANY_DAILY)
export const widgetWeatherAddManyHourly = createTypes(WIDGET_WEATHER_ADD_MANY_HOURLY)
export const widgetWeatherAddManyWeekly = createTypes(WIDGET_WEATHER_ADD_MANY_WEEKLY)
