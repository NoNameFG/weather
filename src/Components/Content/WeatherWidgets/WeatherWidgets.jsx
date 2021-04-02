import React from 'react'
import './WeatherWidgets.scss'
import WidgetTemplate from './WidgetTemplate/WidgetTemplate.jsx'
import { useSelector } from 'react-redux'
import ReloadButton from './ReloadButton/ReloadButton.jsx'
import withHeader from '../../HOC/withHeader.jsx'

const WeatherWidgets = () => {
  const cityList = useSelector(state => state.widgetsData)

  const widgetList = cityList.map(el => (
    (!el.dailyWeather.error && el.widgetSettings.displayFlag) &&
      <WidgetTemplate
        key={ 'widget-' + el.widgetSettings.uniqeKey }
        { ...el }
      />
  ))

  return(
    <>
      <div className="city-settings">
        <div className="city-settings__search">
          <input type="text" placeholder="City name..."/>
        </div>

        <ReloadButton/>
      </div>

      <div className="weather">
        { widgetList }
      </div>
    </>
  )
}

export default withHeader(WeatherWidgets)
