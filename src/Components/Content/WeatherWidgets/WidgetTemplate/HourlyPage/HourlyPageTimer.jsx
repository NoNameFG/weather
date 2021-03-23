import React, { useEffect, useState } from 'react'

const HourlyPageTimer = () => {
  const [ nowTime, setNowTime ] = useState(new Date())

  useEffect(() => {
    const timeCheckout = setInterval(() => {
      setNowTime(new Date())
    } ,1000)

    return () => {
      clearInterval(timeCheckout)
    }
  }, [])

  const nowDate = () => {
    const month = nowTime.toLocaleString('en-US', { month: 'long' })
    const day = nowTime.getDate()
    return `${month} ${day}`
  }

  const getTime = () => {
    let timeStr = ''
    timeStr += nowTime.getHours()
    timeStr += ':'
    timeStr += nowTime.getMinutes() < 10 ? '0' + nowTime.getMinutes() : nowTime.getMinutes()

    return timeStr
  }


  const pointerPosition = () => {
    const secFromDayBegin = nowTime.getSeconds() + (60 * (nowTime.getMinutes() + (60 * nowTime.getHours())))
    const positionPerSec = 420 / 86400
    return positionPerSec * secFromDayBegin
  }

  return(
    <>
      <div className="weather__template-hourly__date">
        { nowDate() }
        <div className="weather__template-hourly__date-time">
          { getTime() }
        </div>
      </div>
      <div className="weather__template-hourly__space">
        <span
          className="weather__template-hourly__space-pointer"
          style={{left: pointerPosition() + 'px'}}
        ></span>
      </div>
    </>
  )
}

export default HourlyPageTimer
