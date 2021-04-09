import React, { useState } from 'react'
import HourlyPage from './HourlyPage/HourlyPage.jsx'
import WeekPage from './WeekPage/WeekPage.jsx'
import DayPage from './DayPage/DayPage.jsx'
import WidgetRangeButton from './WidgetRangeButton.jsx'
import Preloader from '../../../Preloader/Preloader.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { widgetRemoveCityID } from '../../../../Redux/Actions/widgetRemoveCityID.js'
import { removeFromLocalStorage } from '../../../../Function/manipulateCityLocStor.js'
import { DAY, WEEK, HOURLY } from '../../../../Constants/RangeTypes.js'
import { api } from '../../../../Services/Api.js'


const WidgetTemplate = ({ dailyWeather, hourlyWeather, weeklyWeather, widgetSettings }) => {
  const dispatch = useDispatch()
  const isLoggedin = useSelector(state => state.userData.isLoggedin)

  const [ section, setSection ] = useState(DAY)

  const content = () => {
    switch (section) {
      case WEEK:
        return <WeekPage weeklyWeather={weeklyWeather}/>
      case HOURLY:
        return <HourlyPage hourlyWeather={hourlyWeather}/>
      case DAY:
      default:
        return (
          <DayPage
            dailyWeather={dailyWeather}
            isFavorite={widgetSettings.isFavorite}
          />
        )
    }
  }

  const removeWidget = async () => {
    if(isLoggedin){
      await api.city.delete({ cityID: dailyWeather.id })
    }
    dispatch(widgetRemoveCityID({ cityID: dailyWeather.id }))
    removeFromLocalStorage(dailyWeather.id)
  }

  const showingContent = () => (
    <>
    { content() }

    <div className="weather__template-range">
      <WidgetRangeButton active={ section === DAY } range={DAY} onClick={setSection}/>

      <WidgetRangeButton active={ section === HOURLY } range={HOURLY} onClick={setSection}/>

      <WidgetRangeButton active={ section === WEEK } range={WEEK} onClick={setSection}/>
    </div>

    <div onClick={removeWidget} className="weather__template-close-btn"></div>
    </>
  )

  return(
    <div className="weather__template">
      {
        (dailyWeather.loading) ?
          <Preloader className="weather__template-preloader"/>
          :
          showingContent()
      }
    </div>
  )
}

export default WidgetTemplate
