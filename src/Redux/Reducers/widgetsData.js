import {
    WIDGET_REMOVE_CITY_ID,
    widgetWeatherAddDaily,
    widgetWeatherAddHourly,
    widgetWeatherAddWeekly,
    widgetWeatherAddManyDaily,
    widgetWeatherAddManyHourly,
    widgetWeatherAddManyWeekly
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

const reducerFunctions = {
  weatherRequest: (state, { index, weatherType }) => {
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
  weatherSuccess: (state, { weatherData, index, weatherType }) => {
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
  weatherError: (state, { error, index, weatherType }) => {
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
  weatherFulfill: (state, { index, weatherType }) => {
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

  weatherRequestMany: (state, { idList, weatherType }) => {
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
  weatherSuccessMany: (state, { weatherDataList, weatherType }) => {
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
  weatherErrorMany: (state, { error, weatherType }) => {
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
  weatherFulfillMany: (state, { weatherType }) => {
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




const reducerMap = {
  [widgetWeatherAddDaily.REQUEST]: (state, { index }) => reducerFunctions.weatherRequest(state, { index, weatherType: weatherTypes.dailyWeather }),
  [widgetWeatherAddDaily.SUCCESS]: (state, { weatherData, index }) => reducerFunctions.weatherSuccess(state, { weatherData, index, weatherType: weatherTypes.dailyWeather }),
  [widgetWeatherAddDaily.ERROR]: (state, { error, index }) => reducerFunctions.weatherError(state, { error, index, weatherType: weatherTypes.dailyWeather }),
  [widgetWeatherAddDaily.FULFILL]: (state, { index }) => reducerFunctions.weatherFulfill(state, { index, weatherType: weatherTypes.dailyWeather }),

  [widgetWeatherAddHourly.REQUEST]: (state, { index }) => reducerFunctions.weatherRequest(state, { index, weatherType: weatherTypes.hourlyWeather }),
  [widgetWeatherAddHourly.SUCCESS]: (state, { weatherData, index }) => reducerFunctions.weatherSuccess(state, { weatherData, index, weatherType: weatherTypes.hourlyWeather }),
  [widgetWeatherAddHourly.ERROR]: (state, { error, index }) => reducerFunctions.weatherError(state, { error, index, weatherType: weatherTypes.hourlyWeather }),
  [widgetWeatherAddHourly.FULFILL]: (state, { index }) => reducerFunctions.weatherFulfill(state, { index, weatherType: weatherTypes.hourlyWeather }),

  [widgetWeatherAddWeekly.REQUEST]: (state, { index }) => reducerFunctions.weatherRequest(state, { index, weatherType: weatherTypes.weeklyWeather }),
  [widgetWeatherAddWeekly.SUCCESS]: (state, { weatherData, index }) => reducerFunctions.weatherSuccess(state, { weatherData, index, weatherType: weatherTypes.weeklyWeather }),
  [widgetWeatherAddWeekly.ERROR]: (state, { error, index }) => reducerFunctions.weatherError(state, { error, index, weatherType: weatherTypes.weeklyWeather }),
  [widgetWeatherAddWeekly.FULFILL]: (state, { index }) => reducerFunctions.weatherFulfill(state, { index, weatherType: weatherTypes.weeklyWeather }),

  [WIDGET_REMOVE_CITY_ID]: (state, { id }) => (state.filter(el => el.dailyWeather.weatherData.id !== id)),

  [widgetWeatherAddManyDaily.REQUEST]: (state, { idList }) => reducerFunctions.weatherRequestMany(state, { idList, weatherType: weatherTypes.dailyWeather }),
  [widgetWeatherAddManyDaily.SUCCESS]: (state, { weatherDataList }) => reducerFunctions.weatherSuccessMany(state, { weatherDataList, weatherType: weatherTypes.dailyWeather }),
  [widgetWeatherAddManyDaily.ERROR]: (state, { error }) => reducerFunctions.weatherErrorMany(state, { error, weatherType: weatherTypes.dailyWeather }),
  [widgetWeatherAddManyDaily.FULFILL]: (state) => reducerFunctions.weatherFulfillMany(state, { weatherType: weatherTypes.dailyWeather }),

  [widgetWeatherAddManyHourly.REQUEST]: (state, { idList }) => reducerFunctions.weatherRequestMany(state, { idList, weatherType: weatherTypes.hourlyWeather }),
  [widgetWeatherAddManyHourly.SUCCESS]: (state, { weatherDataList }) => reducerFunctions.weatherSuccessMany(state, { weatherDataList, weatherType: weatherTypes.hourlyWeather }),
  [widgetWeatherAddManyHourly.ERROR]: (state, { error }) => reducerFunctions.weatherErrorMany(state, { error, weatherType: weatherTypes.hourlyWeather }),
  [widgetWeatherAddManyHourly.FULFILL]: (state) => reducerFunctions.weatherFulfillMany(state, { weatherType: weatherTypes.hourlyWeather }),

  [widgetWeatherAddManyWeekly.REQUEST]: (state, { idList }) => reducerFunctions.weatherRequestMany(state, { idList, weatherType: weatherTypes.weeklyWeather }),
  [widgetWeatherAddManyWeekly.SUCCESS]: (state, { weatherDataList }) => reducerFunctions.weatherSuccessMany(state, { weatherDataList, weatherType: weatherTypes.weeklyWeather }),
  [widgetWeatherAddManyWeekly.ERROR]: (state, { error }) => reducerFunctions.weatherErrorMany(state, { error, weatherType: weatherTypes.weeklyWeather }),
  [widgetWeatherAddManyWeekly.FULFILL]: (state) => reducerFunctions.weatherFulfillMany(state, { weatherType: weatherTypes.weeklyWeather })
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
