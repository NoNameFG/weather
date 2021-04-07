import './Profile.scss'
import withHomeButton from '../../HOC/HomeButton/withHomeButton.jsx'
import ProfileInfo from './Info/ProfileInfo.jsx'
import CityList from './CityList/Citylist.jsx'

const Profile = () => {
  return(
    <div className="profile">
      <ProfileInfo/>
      <CityList/>
    </div>
  )
}

export default withHomeButton(Profile)
