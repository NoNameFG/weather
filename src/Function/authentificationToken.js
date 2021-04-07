import axios from 'axios'

export const setDefaultHeader = token => {
  console.log(token)
  localStorage.setItem('auth', token)
  // axios.defaults.headers.common['auth'] = token
}
export const clearDefaultHeader = () => {
  // delete axios.defaults.headers.common['auth']
  localStorage.removeItem('auth')
}
// export const setDefaultHeaderFromLocalStorage = () => {
//   const token = localStorage.getItem('auth')
//   axios.defaults.headers.common['auth'] = token
// }
