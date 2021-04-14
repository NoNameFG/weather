import { WIDGET_WEATHER_ADD, WIDGET_WEATHER_ADD_MANY } from '../Constants/constants.js'
import { takeLatest } from 'redux-saga/effects'
import addNewCity from './Sagas/addNewCity.js'
import addManyCityData from './Sagas/addManyCityData.js'

function* mySaga(){
  yield takeLatest(WIDGET_WEATHER_ADD, addNewCity)
  yield takeLatest(WIDGET_WEATHER_ADD_MANY, addManyCityData)
}

export default mySaga
