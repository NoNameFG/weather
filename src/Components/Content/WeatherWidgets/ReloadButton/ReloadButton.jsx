import { useDispatch } from 'react-redux'
import { addManyCityData } from '../../../../Redux/Thunk/addManyCityData.js'


const ReloadButton = () => {
  const dispatch = useDispatch()

  const handleClick = () => {
    const cityList = JSON.parse(localStorage.getItem('cityList'))
    if(cityList){
      dispatch(addManyCityData({idList: cityList}))
    }
  }

  return(
    <div className="city-settings__reload">
      <button onClick={handleClick}>
        Reload ↻
      </button>
    </div>
  )
}

export default ReloadButton
