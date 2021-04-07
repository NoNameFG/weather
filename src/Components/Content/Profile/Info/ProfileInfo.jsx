import DefaultButton from '../../../DefaultComponents/Button/DefaultButton.jsx'
import { buttonTypes } from '../../../DefaultComponents/Button/buttonTypes.js'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import ProfileInput from '../ProfileInput/ProfileInput.jsx'

const ProfileInfo = () => {
  const { phone_number, name, surname, email } = useSelector(state => state.userData)

  const [ userData, setUserData ] = useState({
    name: '',
    surname: '',
    phone_number: '',
    email: '',
    password: ''
  })

  const handleChange = e => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  return(
    <div className="profile__info">
      <div className="profile__info-details">
        <ProfileInput
          unactiveValue={name}
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleChange}
          value={userData.name}
        />
        <ProfileInput
          unactiveValue={surname}
          type="text"
          placeholder="Surname"
          name="surname"
          onChange={handleChange}
          value={userData.surname}
        />
        <ProfileInput
          unactiveValue={phone_number}
          type="text"
          placeholder="Phone number"
          name="phone_number"
          onChange={handleChange}
          value={userData.phone_number}
        />
        <ProfileInput
          unactiveValue={email}
          type="text"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={userData.email}
        />
        <ProfileInput
          unactiveValue="********"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={userData.password}
        />
      </div>
      <div className="profile__info-controll">
        <DefaultButton
          type={buttonTypes.PRIMARY}
          text="Update"
          additionalClassName="profile__info-controll-button"
        />
      </div>
    </div>
  )
}

export default ProfileInfo
