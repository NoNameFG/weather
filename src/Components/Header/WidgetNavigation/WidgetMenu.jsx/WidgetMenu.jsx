import CityItem from '../CityItem.jsx/CityItem.jsx'
import { useSelector } from 'react-redux'

const WidgetMenu = ({ setIsOpen }) => {
  const citiesList = useSelector(state => (
    state.widgetsData.filter(el => el.widgetSettings.isFavorite).map(el => {
      return {
        city: el.dailyWeather.name,
        cityID: el.dailyWeather.id,
        displayFlag: el.widgetSettings.displayFlag
      }
    })
  ))

  const displayList = citiesList.map(el => (
    <CityItem
      key={'favorite_widget-' + el.cityID}
      {...el}
    />
  ))

  return (
    <div className="header__widget-navigation__slide">
      <div className="header__widget-navigation__slide-menu">
        <span className="header__widget-navigation__slide-menu-title">
          Favorite cities list
        </span>
        <div className="header__widget-navigation__slide-menu__list">

          { displayList }

        </div>
      </div>
      <div
        className="header__widget-navigation__slide-filter"
        onClick={() => setIsOpen(false)}
      >
      </div>
    </div>
  )
}

export default WidgetMenu
