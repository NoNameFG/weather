import { USER_LOGIN, USER_LOGOUT } from '../Constants/userConstants.js'

export const userLogin = (payload) => ({
  type: USER_LOGIN,
  payload: payload
})

export const userLogout = (payload) => ({
  type: USER_LOGOUT,
  payload: payload
})
