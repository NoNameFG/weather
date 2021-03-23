import React, { useState } from 'react'
import HourlyPage from './HourlyPage/HourlyPage.jsx'
import WeekPage from './WeekPage/WeekPage.jsx'
import DayPage from './DayPage/DayPage.jsx'
import WidgetRangeButton from './WidgetRangeButton.jsx'
import { useDispatch } from 'react-redux'
import { widgetRemoveCityID } from '../../../../Redux/Actions/widgetRemoveCityID.js'
import { removeFromLocalStorage } from '../../../../Function/manipulateCityLocStor.js'
import { DAY, WEEK, HOURLY } from '../../../../Constants/RangeTypes.js'


const WidgetTemplate = ({cityID}) => {
  const [ section, setSection ] = useState(DAY)
  const dispatch = useDispatch()

  const content = () => {
    switch (section) {
      case WEEK:
        return <WeekPage cityID={cityID}/>
      case HOURLY:
        return <HourlyPage cityID={cityID}/>
      case DAY:
      default:
        return <DayPage cityID={cityID}/>
    }
  }


  const removeWidget = () => {
    dispatch(widgetRemoveCityID({id: cityID}))
    removeFromLocalStorage(cityID)
  }

  return(
    <div className="weather__template">

      { content() }

      <div className="weather__template-range">
        <WidgetRangeButton active={ section === DAY } range={DAY} onClick={setSection}/>

        <WidgetRangeButton active={ section === HOURLY } range={HOURLY} onClick={setSection}/>

        <WidgetRangeButton active={ section === WEEK } range={WEEK} onClick={setSection}/>
      </div>

      <div onClick={removeWidget} className="weather__template-close-btn"></div>
    </div>
  )
}

export default WidgetTemplate
