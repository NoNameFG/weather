import { useDispatch } from 'react-redux'
import { widgetSetDisplay } from '../../../../Redux/Actions/widgetSetDisplay.js'
import { api } from '../../../../Services/Api.js'

const CityItem = ({city, cityID, displayFlag}) => {
  const dispatch = useDispatch()

  const handleClick = async () => {
    dispatch(widgetSetDisplay({cityID, displayFlag: !displayFlag}))
    await api.city.update({cityID, settings: {displayFlag: !displayFlag}})
  }

  return(
    <label className="header__widget-navigation__slide-menu__list-item">
      <div className="header__widget-navigation__slide-menu__list-item-city">
        { city }
      </div>
      <div className="header__widget-navigation__slide-menu__list-item-display">
        Display
        <input checked={displayFlag} onChange={handleClick} type="checkbox"/>
      </div>
    </label>
  )
}

export default CityItem
