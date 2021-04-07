export const registrateNotValid = {
  name: (str) => {
    if(!str.length) return 'Name is a required field'
  },
  surname: (str) => {
    if(!str.length) return 'Surname is a required field'
  },
  phone_number: (str) => {
    if(!/^[0-9\-\+]{9,15}$/.test(str)) return 'Phone number is not valid!'
  },
  email: (str) => {
    const regEx = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if(!regEx.test(str.toLowerCase())) return 'Email is inncorrect'
  },
  password: (str) => {
    if(!/(?=.*[A-Z])/.test(str)) return 'Password must contain at least 8 characters.'
  }
}
