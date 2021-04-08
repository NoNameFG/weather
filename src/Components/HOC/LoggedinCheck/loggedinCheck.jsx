import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const loggedinCheck = Component => props => {
  const isLoggedin = useSelector(state => state.userData.isLoggedin)
  
  return(
    isLoggedin ?
      <Component {...props}/>
      :
      <Redirect to='/'/>
  )
}

export default loggedinCheck
