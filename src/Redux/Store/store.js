import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

//Reducers
import { widgetsData } from '../Reducers/widgetsData.js'


const allReducers = combineReducers({
  widgetsData
})

const store = createStore(
  allReducers,
  composeWithDevTools(applyMiddleware())
)

export default store
