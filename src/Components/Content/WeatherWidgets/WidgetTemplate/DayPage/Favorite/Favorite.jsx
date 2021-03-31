import { ReactComponent as FavoriteIcon } from '../../../../../../Dist/Content/WeatherWidgets/star.svg'
import { ReactComponent as FavoriteFilledIcon } from '../../../../../../Dist/Content/WeatherWidgets/star_filled.svg'
import { useDispatch } from 'react-redux'
import { widgetMakeFavorite } from '../../../../../../Redux/Actions/widgetMakeFavorite.js'

const Favorite = ({ isFavorite, cityID }) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(widgetMakeFavorite({ isFavorite: !isFavorite, cityID }))
  }

  return(
    <div onClick={handleClick} className="weather__template-indicators__favorite">
      {
        isFavorite ? <FavoriteFilledIcon/> : <FavoriteIcon/>
      }
    </div>
  )
}

export default Favorite
