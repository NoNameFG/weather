import { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { widgetAddCityID } from './Redux/Actions/widgetAddCityID.js'
import { widgetDailyWeatherAdd } from './Redux/Actions/widgetDailyWeatherAdd.js'
import { widgetHourlyWeatherAdd } from './Redux/Actions/widgetHourlyWeatherAdd.js'
import { widgetWeeklyWeatherAdd } from './Redux/Actions/widgetWeeklyWeatherAdd.js'
import weatherApi from './Services/WeatherAPI.js'
import './App.scss';
import Header from './Components/Header/Header.jsx'
import WeatherWidgets from './Components/Content/WeatherWidgets/WeatherWidgets.jsx'
import CityWeather from './Components/Content/CityWeather/CityWeather.jsx'
import { Switch, Route } from 'react-router-dom'

function App() {
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    const cityList = JSON.parse(localStorage.getItem('cityList'))
    if(cityList){
      cityList.forEach(async el => {
        let dataDaily = await weatherApi.getCurrentWeatherByCityID(el)
        let dataHorly = await weatherApi.getHourlyWeather(dataDaily.coord)
        let dataWeekly = await weatherApi.getWeeklyWeather(dataDaily.coord)
        dispatch(widgetDailyWeatherAdd({
          cityID: dataDaily.id,
          weatherData: dataDaily
        }))
        dispatch(widgetHourlyWeatherAdd({
          cityID: dataDaily.id,
          weatherData: dataHorly
        }))
        dispatch(widgetWeeklyWeatherAdd({
          cityID: dataDaily.id,
          weatherData: dataWeekly
        }))
        dispatch(widgetAddCityID({id: dataDaily.id}))
      })
    }
  })

  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route exact path="/">
          <WeatherWidgets/>
        </Route>
        <Route path="/city">
          <CityWeather/>
        </Route>

      </Switch>
    </div>
  );
}

export default App;
