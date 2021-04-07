import axios from 'axios'

export const api = {
  registration: data => axios.post('/registration', data),
  login: data => axios.get('/login', {params: data}),
  getProfile: () => axios.get('/profile')
}
