import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import promise from 'redux-promise'
import thunk from 'redux-thunk'

//Reducers
import { widgetsData } from '../Reducers/widgetsData.js'
import { userData } from '../Reducers/userData.js'


const allReducers = combineReducers({
  widgetsData,
  userData
})

const store = createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(promise,thunk))
)

export default store
