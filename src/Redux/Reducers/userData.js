import { USER_LOGIN, USER_LOGOUT } from '../Constants/userConstants.js'
import { createReducer } from './createReducer/createReducer.js'
import PropTypes from 'prop-types'


export const initialState = {
  _id: '',
  name: '',
  surname: '',
  phone_number: '',
  email: '',
  isLoggedin: false
}

const REDUCER_SCHEMA = {
  _id: PropTypes.string,
  name: PropTypes.string,
  surname: PropTypes.string,
  phone_number: PropTypes.string,
  email: PropTypes.string,
  isLoggedin: PropTypes.boolean
}

const reducerMap = {
  [USER_LOGIN]: (state, payload) => ({ ...payload, isLoggedin: true }),
  [USER_LOGOUT]: () => ({ ...initialState, isLoggedin: false })
}

export const userData = createReducer(reducerMap, initialState)
