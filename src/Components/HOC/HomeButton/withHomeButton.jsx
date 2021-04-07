import { ReactComponent as Home } from '../../../Dist/Content/HomeButton/home.svg'
import { Link } from 'react-router-dom'
import './withHomeButton.scss'


const withHomeButton = Component => () => (
  <>
    <Link to="/" className="home-button">
      <Home/>
    </Link>
    <Component/>
  </>
)

export default withHomeButton
