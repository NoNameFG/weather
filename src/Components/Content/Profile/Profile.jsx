import './Profile.scss'
import withHomeButton from '../../HOC/HomeButton/withHomeButton.jsx'
import ProfileInfo from './Info/ProfileInfo.jsx'
import CityList from './CityList/Citylist.jsx'
import loggedinCheck from '../../HOC/LoggedinCheck/loggedinCheck.jsx'
import { compose } from 'redux'

const Profile = () => {

  return(
    <div className="profile">
      <ProfileInfo/>
      <CityList/>
    </div>
  )
}

export default compose(loggedinCheck, withHomeButton)(Profile)
