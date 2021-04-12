import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import promise from 'redux-promise'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

//Reducers
import { widgetsData } from '../Reducers/widgetsData.js'
import { userData } from '../Reducers/userData.js'
//Saga
import mySaga from '../Saga/mySaga.js'


const sagaMiddleware = createSagaMiddleware()

const allReducers = combineReducers({
  widgetsData,
  userData
})

const store = createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(promise, thunk, sagaMiddleware))
)

sagaMiddleware.run(mySaga)

export default store
