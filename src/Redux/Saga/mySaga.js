import { WIDGET_WEATHER_ADD } from '../Constants/constants.js'
import { takeEvery } from 'redux-saga/effects'
import addNewCity from './Sagas/addNewCity.js'

function* mySaga(){
  yield takeEvery(WIDGET_WEATHER_ADD, addNewCity)
}

export default mySaga
