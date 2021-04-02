import profileIcon from '../../../HOC/profileIcon.jsx'
import { ReactComponent as LoginSVG } from '../../../../Dist/Content/Login/login.svg'
import { ReactComponent as LogoutSVG } from '../../../../Dist/Content/Login/logout.svg'
import { ReactComponent as ProfileSVG } from '../../../../Dist/Content/Login/profile.svg'


export const LoginIcon = profileIcon(LoginSVG)
export const LogoutIcon = profileIcon(LogoutSVG)
export const ProfileIcon = profileIcon(ProfileSVG)
