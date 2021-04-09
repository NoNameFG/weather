import { ReactComponent as FavoriteIcon } from '../../../../../../Dist/Content/WeatherWidgets/star.svg'
import { ReactComponent as FavoriteFilledIcon } from '../../../../../../Dist/Content/WeatherWidgets/star_filled.svg'
import { useDispatch } from 'react-redux'
import { widgetMakeFavorite } from '../../../../../../Redux/Actions/widgetMakeFavorite.js'
import { api } from '../../../../../../Services/Api.js'

const Favorite = ({ isFavorite, cityID }) => {
  const dispatch = useDispatch()

  const handleClick = async () => {
    dispatch(widgetMakeFavorite({ isFavorite: !isFavorite, cityID }))
    await api.city.update({cityID, settings: {isFavorite: !isFavorite}})
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
