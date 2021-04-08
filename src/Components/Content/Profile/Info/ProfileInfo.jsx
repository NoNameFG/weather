import DefaultButton from '../../../DefaultComponents/Button/DefaultButton.jsx'
import { buttonTypes } from '../../../DefaultComponents/Button/buttonTypes.js'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import ProfileInput from '../ProfileInput/ProfileInput.jsx'
import UpdatePopup from '../UpdatePopup/UpdatePopup.jsx'
import { userUpdate } from '../../../../Redux/Actions/user.js'
import { api } from '../../../../Services/Api.js'


const ProfileInfo = () => {
  const dispatch = useDispatch()
  const { phone_number, name, surname, email } = useSelector(state => state.userData)
  const [ isPopupOpen, setIsPopupOpen ] = useState(false)
  const [ userData, setUserData ] = useState({
    name: '',
    surname: '',
    phone_number: '',
    email: '',
    password: ''
  })
  const [ errors, setErrors ] = useState({})
  const [ confirmPassword, setConfirmPassword ] = useState('')

  const errorUpdate = key => {
    if(errors[key]){
      const excludeError = {...errors}
      delete excludeError[key]
      setErrors(excludeError)
    }
  }

  const handleConfirmPasswordChange = e => {
    setConfirmPassword(e.target.value)
    errorUpdate(e.target.name)
  }

  const handleChange = e => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
    errorUpdate(e.target.name)
  }

  const cancelAction = () => {
    setIsPopupOpen(false)
    setConfirmPassword('')
    if(errors?.confirmPassword) errorUpdate('confirmPassword')
  }

  const updateProfile = async () => {
    try {
      const user = await api.updateProfile({updateData: userData, confirmPassword})
      dispatch(userUpdate(user.data))
      cancelAction()
    } catch (e) {
      if(!e.response.data.confirmPassword){
        cancelAction()
      }
      setErrors(e.response.data)
    }
  }

  return(
    <>
      {
        isPopupOpen &&
        <UpdatePopup
          confirmAction={updateProfile}
          cancelAction={cancelAction}
          onInputChange={handleConfirmPasswordChange}
          errors={errors}
          confirmPassword={confirmPassword}
        />
      }
      <div className="profile__info">
        <div className="profile__info-details">
          <ProfileInput
            unactiveValue={name}
            type="text"
            placeholder="Name"
            name="name"
            onChange={handleChange}
            value={userData.name}
            errors={errors}
          />
          <ProfileInput
            unactiveValue={surname}
            type="text"
            placeholder="Surname"
            name="surname"
            onChange={handleChange}
            value={userData.surname}
            errors={errors}
          />
          <ProfileInput
            unactiveValue={phone_number}
            type="text"
            placeholder="Phone number"
            name="phone_number"
            onChange={handleChange}
            value={userData.phone_number}
            errors={errors}
          />
          <ProfileInput
            unactiveValue={email}
            type="text"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={userData.email}
            errors={errors}
          />
          <ProfileInput
            unactiveValue="********"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={userData.password}
            errors={errors}
          />
        </div>
        <div className="profile__info-controll">
          <DefaultButton
            type={buttonTypes.PRIMARY}
            text="Update"
            additionalClassName="profile__info-controll-button"
            onClick={() => setIsPopupOpen(true)}
          />
        </div>
      </div>
    </>
  )
}

export default ProfileInfo
