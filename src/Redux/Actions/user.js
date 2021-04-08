import { USER_LOGIN, USER_LOGOUT, USER_UPDATE } from '../Constants/userConstants.js'

export const userLogin = (payload) => ({
  type: USER_LOGIN,
  payload: payload
})

export const userLogout = (payload) => ({
  type: USER_LOGOUT,
  payload: payload
})

export const userUpdate = (payload) => ({
  type: USER_UPDATE,
  payload: payload
})
