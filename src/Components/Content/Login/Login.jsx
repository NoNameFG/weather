import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './Login.scss'
import DefaultInput from './LoginInput/LoginInput.jsx'
import DefaultButton from '../../DefaultComponents/Button/DefaultButton.jsx'
import ErrorTemplate from './ErrorTemplate/ErrorTemplate.jsx'
import { buttonTypes } from '../../DefaultComponents/Button/buttonTypes.js'
import withHomeButton from '../../HOC/HomeButton/withHomeButton.jsx'
import { api } from '../../../Services/Api.js'
import { userLogin } from '../../../Redux/Actions/userLogin.js'
import { setDefaultHeader } from '../../../Function/authentificationToken.js'


const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [ credentials, setCredentials ] = useState({
    email: '123@gmail.com',
    password: '12345678'
  })
  const [ errors, setErrors ] = useState({})


  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
    setErrors({})
  }

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const user = await api.login(credentials)
      setDefaultHeader(user.headers.auth)
      dispatch(userLogin(user.data))
      history.push('/')
    } catch (e) {
      setErrors({
        email: true,
        password: true
      })
    }
  }

  const handleRedirectToRegistration = () => {
    history.push('/registration')
  }

  return(
    <div className="login">
      <form className="login__template" onSubmit={handleLogin}>

        <ErrorTemplate isOpen={errors.email} handleClose={() => setErrors({})}/>

        <div className="login__template-fields-group">
          <DefaultInput
            value={credentials.email}
            onChange={handleChange}
            type="text"
            placeholder="Email"
            name="email"
            additionalClassName="login__template-fields-group-input"
            errors={errors}
          />
          <DefaultInput
            value={credentials.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            name="password"
            errors={errors}
          />
        </div>


        <div className="login__template-buttons-group">
          <DefaultButton
            type={buttonTypes.PRIMARY}
            text="Login"
            additionalClassName="login__template-buttons-group-button"
            onSubmit={handleLogin}
          />
          <DefaultButton
            type={buttonTypes.SECONDARY}
            text="Registration"
            onClick={handleRedirectToRegistration}
          />
        </div>
      </form>
    </div>
  )
}

export default withHomeButton(Login)
