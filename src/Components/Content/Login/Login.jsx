import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './Login.scss'
import DefaultInput from '../../DefaultComponents/Input/Input.jsx'
import DefaultButton from '../../DefaultComponents/Button/DefaultButton.jsx'
import { buttonTypes } from '../../DefaultComponents/Button/buttonTypes.js'

const Login = () => {
  const [ credentials, setCredentials ] = useState({
    login: '',
    password: ''
  })
  const history = useHistory()


  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = e => {
    e.preventDefault()
  }

  const handleRedirectToRegistration = () => {
    history.push('/registration')
  }

  return(
    <div className="login">
      <form className="login__template" onSubmit={handleLogin}>

        <div className="login__template-fields-group">
          <DefaultInput
            value={credentials.login}
            onChange={handleChange}
            type="text"
            placeholder="Login"
            name="login"
            additionalClassName="login__template-fields-group-input"
          />
          <DefaultInput
            value={credentials.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            name="password"
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

export default Login
