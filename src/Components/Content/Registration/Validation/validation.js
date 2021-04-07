import { registrateNotValid } from '../../../../Function/validation/Registration.js'

export const validation = (obj) => {
  const errors = {}

  for(let key in obj){
    let err = registrateNotValid[key](obj[key])
    if(err) errors[key] = err
  }

  return errors
}
