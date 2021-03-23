import React from 'react'
import './WeatherWidgets.scss'
import WidgetTemplate from './WidgetTemplate/WidgetTemplate.jsx'
import { useSelector } from 'react-redux'

const WeatherWidgets = () => {
  const cityList = useSelector(state => state.widgetsData.idCities)

  const widgetList = cityList.map(el => (
    <WidgetTemplate
      key={ 'widget' + el }
      cityID={el}
    />
  ))

  return(
    <>
      <div className="city-search">
        <input type="text" placeholder="City name..."/>
      </div>
      <div className="weather">
        { widgetList }
      </div>
    </>
  )
}

export default WeatherWidgets
