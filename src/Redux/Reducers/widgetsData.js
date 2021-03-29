import {
    WIDGET_REMOVE_CITY_ID,
    widgetWeatherAdd,
    widgetWeatherAddMany
} from '../Constants/constants.js'
import { createReducer } from './createReducer/createReducer.js'
import PropTypes from 'prop-types'

export const weatherTypes = {
  dailyWeather: 'dailyWeather',
  hourlyWeather: 'hourlyWeather',
  weeklyWeather: 'weeklyWeather'
}

const initialState = []

const REDUCER_SCHEMA = {
  idCities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      error: PropTypes.string,
      loading: PropTypes.boolean
    })
  ),
  dailyWeather: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      wind: PropTypes.number,
      temparature: PropTypes.number,
      pressure: PropTypes.number,
      humidity: PropTypes.number,
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
  [widgetWeatherAdd.REQUEST]: (state, { index, weatherType }) => {
    const newList = [...state]
    newList[index] = {
      ...newList[index],
      [weatherType]: {
        loading: true,
        error: null
      }
    }
    return newList
  },
  [widgetWeatherAdd.SUCCESS]: (state, { weatherData, index, weatherType }) => {
    const newList = [...state]
    newList[index] = {
      ...newList[index],
      [weatherType]: {
        ...newList[index][weatherType],
        weatherData: weatherData
      }
    }
    return newList
  },
  [widgetWeatherAdd.ERROR]: (state, { error, index, weatherType }) => {
    const newList = [...state]
    newList[index] = {
      ...newList[index],
      [weatherType]: {
        loading: false,
        error
      }
    }
    return newList
  },
  [widgetWeatherAdd.FULFILL]: (state, { index, weatherType }) => {
    const newList = [...state]
    newList[index] = {
      ...newList[index],
      [weatherType]: {
        ...newList[index][weatherType],
        loading: false
      }
    }
    return newList
  },


  [WIDGET_REMOVE_CITY_ID]: (state, { id }) => (state.filter(el => el.dailyWeather.weatherData.id !== id)),


  [widgetWeatherAddMany.REQUEST]: (state, { idList, weatherType }) => {
    return idList.map((el, index) => {
      return {
        ...state[index],
        [weatherType]: {
          loading: true,
          error: null
        }
      }
    })
  },
  [widgetWeatherAddMany.SUCCESS]: (state, { weatherDataList, weatherType }) => {
    return weatherDataList.map((el, index) => {
      return {
        ...state[index],
        [weatherType]: {
          ...state[index][weatherType],
          weatherData: el
        }
      }
    })
  },
  [widgetWeatherAddMany.ERROR]: (state, { error, weatherType }) => {
    return state.map(el => {
      return {
        ...el,
        [weatherType]: {
          loading: false,
          error
        }
      }
    })
  },
  [widgetWeatherAddMany.FULFILL]: (state, { weatherType }) => {
    return state.map(el => {
      return {
        ...el,
        [weatherType]: {
          ...el[weatherType],
          loading: false
        }
      }
    })
  }
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
