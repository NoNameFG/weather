import { LoginIcon, LogoutIcon, ProfileIcon } from './ProfileIcon/ProfileIconCompose.jsx'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearDefaultHeader } from '../../../Function/authentificationToken.js'
import { userLogout } from '../../../Redux/Actions/user.js'

const ProfileInteraction = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const isLoggedin = useSelector(state => state.userData.isLoggedin)

  const urlTransition = (toURL) => {
    history.push(toURL)
  }

  const userClear = () => {
    clearDefaultHeader()
    dispatch(userLogout())
  }

  return(
    <div className="header__profile">
      {
        isLoggedin ?
          <>
            <ProfileIcon
              className="header__profile-details"
              onClick={() => urlTransition('/profile')}
            />
            <LogoutIcon
              className="header__profile-logout"
              onClick={userClear}
            />
          </>
        :
          <LoginIcon
          className="header__profile-login"
          onClick={() => urlTransition('/login')}
          />
      }


    </div>
  )
}

export default ProfileInteraction
