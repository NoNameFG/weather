import axios from 'axios'

const headers = {headers: {auth: localStorage.getItem('auth')}}

export const api = {
  registration: data => axios.post('/registration', data),
  login: data => axios.get('/login', {params: data}),
  getProfile: () => axios.get('/profile', headers),
  updateProfile: data => axios.patch('/profile', data, headers)
}
