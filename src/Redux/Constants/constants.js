import { createTypes } from './createTypes/createTypes.js'

export const WIDGET_REMOVE_CITY_ID = 'WIDGET_REMOVE_CITY_ID'
export const WIDGET_WEATHER_ADD = 'WIDGET_WEATHER_ADD'
export const WIDGET_WEATHER_ADD_MANY = 'WIDGET_WEATHER_ADD_MANY'

export const widgetWeatherAdd = createTypes(WIDGET_WEATHER_ADD)
export const widgetWeatherAddMany = createTypes(WIDGET_WEATHER_ADD_MANY)
