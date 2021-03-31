import { WIDGET_MAKE_FAVORITE } from '../Constants/constants.js'

export const widgetMakeFavorite = payload => ({
  type: WIDGET_MAKE_FAVORITE,
  payload: payload
})
