import { WIDGET_WEATHER_ADD } from '../../Constants/constants.js'

export const addNewCityAction = payload => ({
  type: WIDGET_WEATHER_ADD,
  payload
})
