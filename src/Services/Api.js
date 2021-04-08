import axios from 'axios'

const headers = {headers: {auth: localStorage.getItem('auth')}}

const apiFunctions = {
  updateProfile: ({ updateData, confirmPassword }) => {
    const filtredUpdateData = {}
    for(let key in updateData){
      if(updateData[key]) filtredUpdateData[key] = updateData[key]
    }
    return {
      updateData: filtredUpdateData,
      confirmPassword
    }
  }
}

export const api = {
  registration: data => axios.post('/registration', data),
  login: data => axios.get('/login', {params: data}),
  getProfile: () => axios.get('/profile', headers),
  updateProfile: data => axios.patch('/profile', apiFunctions.updateProfile(data), headers)
}
