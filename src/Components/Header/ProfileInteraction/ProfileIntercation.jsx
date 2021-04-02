import { LoginIcon, LogoutIcon, ProfileIcon } from './ProfileIcon/ProfileIconCompose.jsx'
import { useHistory } from 'react-router-dom'

const ProfileInteraction = () => {
  const history = useHistory()

  const urlTransition = (toURL) => {
    history.push(toURL)
  }

  const userClear = () => {
    //Add logic to logout button
  }

  return(
    <div className="header__profile">
      <LoginIcon
        className="header__profile-login"
        onClick={() => urlTransition('/login')}
      />
      <ProfileIcon
        className="header__profile-details"
        onClick={() => urlTransition('/profile')}
      />
      <LogoutIcon
        className="header__profile-logout"

      />
    </div>
  )
}

export default ProfileInteraction
