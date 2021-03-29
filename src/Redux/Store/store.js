import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import promise from 'redux-promise'
import thunk from 'redux-thunk'

//Reducers
import { widgetsData } from '../Reducers/widgetsData.js'


const allReducers = combineReducers({
  widgetsData
})

const store = createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(promise,thunk))
)

export default store
