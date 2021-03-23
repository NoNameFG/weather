import {
    WIDGET_ADD_CITY_ID,
    WIDGET_REMOVE_CITY_ID,
    WIDGET_DAILY_WEATHER_ADD,
    WIDGET_HOURLY_WEATHER_ADD,
    WIDGET_WEEKLY_WEATHER_ADD
} from '../Constants/constants.js'
import { createReducer } from './createReducer/createReducer.js'
import PropTypes from 'prop-types'

const initialState = {
  idCities: [],
  dailyWeather: {},
  hourlyWeather: {},
  weeklyWeather: {}
}

const REDUCER_SCHEMA = {
  idCities: PropTypes.arrayOf(
    PropTypes.string
  ),
  dailyWeather: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      wind: PropTypes.number,
      temparature: PropTypes.number,
      coord: PropTypes.shape({
        lat: PropTypes.number,
        lon: PropTypes.number
      }),
      weather: PropTypes.shape({
        icon: PropTypes.string,
        description: PropTypes.string,
        id: PropTypes.number
      })
    })
  ),
  hourlyWeather: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        temp: PropTypes.number,
        weather: PropTypes.shape({
          icon: PropTypes.string,
          id: PropTypes.number
        })
      })
    )
  ),
  weeklyWeather: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.date,
        temp: PropTypes.shape({
          min: PropTypes.number,
          max: PropTypes.number
        }),
        weather: PropTypes.shape({
          icon: PropTypes.string
        })
      })
    )
  )
}



const reducerMap = {
  [WIDGET_ADD_CITY_ID]: (state, payload) => ({idCities: Array.from(new Set([...state.idCities, payload.id]))}),
  [WIDGET_REMOVE_CITY_ID]: (state, payload) => ({idCities: state.idCities.filter(el => el !== payload.id)}),
  [WIDGET_DAILY_WEATHER_ADD]: (state, payload) => ({dailyWeather: {...state.dailyWeather, [payload.cityID]: payload.weatherData}}),
  [WIDGET_HOURLY_WEATHER_ADD]: (state, payload) => ({hourlyWeather: {...state.hourlyWeather, [payload.cityID]: payload.weatherData}}),
  [WIDGET_WEEKLY_WEATHER_ADD]: (state, payload) => ({weeklyWeather: {...state.weeklyWeather, [payload.cityID]: payload.weatherData}})
}

export const widgetsData = createReducer(reducerMap, initialState)

// {
//   idCities: [id, id, id],
//   weeklyWeather: {
//     [id]: {
//
//     }
//   },
//   hours: {
//
//   },
//   daily:{ }
// }
