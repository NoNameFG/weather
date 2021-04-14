import { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addManyCityData } from './Redux/Thunk/addManyCityData.js'
import { addManyCityDataAction } from './Redux/Saga/Actions/addManyCityDataAction.js'
import './App.scss';
import Header from './Components/Header/Header.jsx'
import WeatherWidgets from './Components/Content/WeatherWidgets/WeatherWidgets.jsx'
import CityWeather from './Components/Content/CityWeather/CityWeather.jsx'
import Login from './Components/Content/Login/Login.jsx'
import Registration from './Components/Content/Registration/Registration.jsx'
import Profile from './Components/Content/Profile/Profile.jsx'
import { Switch, Route } from 'react-router-dom'
import { api } from './Services/Api.js'
import { userLogin } from './Redux/Actions/user.js'

function App() {
  const dispatch = useDispatch()
  const isLoggedin = useSelector(state => state.userData.isLoggedin)

  useLayoutEffect(() => {
    const getUserData = async () => {
      if(isLoggedin){
        let data = await api.getProfile()
        if(localStorage.getItem('auth'))
        dispatch(userLogin(data.data))
      }
    }
    getUserData()


    const getManyWeatherData = async () => {
      const localCityList = JSON.parse(localStorage.getItem('cityList'))
      let savedCityList, settingsList = []
      if(isLoggedin){
        settingsList = await api.city.getList()
        savedCityList = settingsList.data.map(el => el.cityID)
      }

      const weatherInformation = JSON.parse(localStorage.getItem('weatherInformation'))
      if((localCityList || savedCityList) && !weatherInformation.length){
        // dispatch(addManyCityData({idList: localCityList || savedCityList, settingsList: settingsList.data}))
        dispatch(addManyCityDataAction({idList: localCityList || savedCityList, settingsList: settingsList.data}))
      }
    }

    getManyWeatherData()

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
          <Registration/>
        </Route>
        <Route path="/profile">
          <Profile/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
