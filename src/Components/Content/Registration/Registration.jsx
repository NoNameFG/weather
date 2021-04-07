import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './Registration.scss'
import DefaultInput from './RegistrationInput/RegistrationInput.jsx'
import DefaultButton from '../../DefaultComponents/Button/DefaultButton.jsx'
import { buttonTypes } from '../../DefaultComponents/Button/buttonTypes.js'
import withHomeButton from '../../HOC/HomeButton/withHomeButton.jsx'
import { api } from '../../../Services/Api.js'
import { validation } from './Validation/validation.js'

const Registration = () => {
  const [ userData, setUserData ] = useState({
    name: '',
    surname: '',
    phone_number: '',
    email: '',
    password: ''
  })
  const [ errors, setErrors ] = useState({})
  const history = useHistory()


  const handleChange = e => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
    if(errors[e.target.name]){
      const excludeError = {...errors}
      delete excludeError[e.target.name]
      setErrors(excludeError)
    }
  }

  const handleRegistrate = async e => {
    e.preventDefault()
    if(Object.keys(validation(userData)).length){
      setErrors(validation(userData))
    } else {
      try {
        await api.registration(userData)
        history.push('/login')
      } catch (e) {
        setErrors(e.response.data)
      }
    }
  }

  const handleCancel = () => {
    history.push('/login')
  }

  return(
    <div className="registration">
      <form className="registration__template" onSubmit={handleRegistrate}>

        <div className="registration__template-fields-group">
          <DefaultInput
            value={userData.name}
            onChange={handleChange}
            type="text"
            placeholder="Name"
            name="name"
            errors={errors}
          />
          <DefaultInput
            value={userData.surname}
            onChange={handleChange}
            type="text"
            placeholder="Surname"
            name="surname"
            errors={errors}
          />
          <DefaultInput
            value={userData.phone_number}
            onChange={handleChange}
            type="text"
            placeholder="Phone number"
            name="phone_number"
            errors={errors}
          />
          <DefaultInput
            value={userData.email}
            onChange={handleChange}
            type="text"
            placeholder="Email"
            name="email"
            errors={errors}
          />
          <DefaultInput
            value={userData.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            name="password"
            errors={errors}
          />
        </div>


        <div className="registration__template-buttons-group">
          <DefaultButton
            type={buttonTypes.PRIMARY}
            text="Confirm"
            additionalClassName="registration__template-buttons-group-button"
            onSubmit={handleRegistrate}
          />
          <DefaultButton
            type={buttonTypes.SECONDARY}
            text="Cancel"
            onClick={handleCancel}
          />
        </div>
      </form>
    </div>
  )
}

export default withHomeButton(Registration)
