import { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addManyCityData } from './Redux/Thunk/addManyCityData.js'
import './App.scss';
import Header from './Components/Header/Header.jsx'
import WeatherWidgets from './Components/Content/WeatherWidgets/WeatherWidgets.jsx'
import CityWeather from './Components/Content/CityWeather/CityWeather.jsx'
import Login from './Components/Content/Login/Login.jsx'
import { Switch, Route } from 'react-router-dom'

function App() {
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    const cityList = JSON.parse(localStorage.getItem('cityList'))
    const weatherInformation = JSON.parse(localStorage.getItem('weatherInformation'))
    if(cityList && !weatherInformation.length){
      dispatch(addManyCityData({idList: cityList}))
    }
  })

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <WeatherWidgets/>
        </Route>
        <Route path="/city">
          <CityWeather/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/registration">
        </Route>
      </Switch>
    </div>
  );
}

export default App;
