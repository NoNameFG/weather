import { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addManyCityData } from './Redux/Thunk/addManyCityData.js'
import './App.scss';
import Header from './Components/Header/Header.jsx'
import WeatherWidgets from './Components/Content/WeatherWidgets/WeatherWidgets.jsx'
import CityWeather from './Components/Content/CityWeather/CityWeather.jsx'
import Login from './Components/Content/Login/Login.jsx'
import Registration from './Components/Content/Registration/Registration.jsx'
import Profile from './Components/Content/Profile/Profile.jsx'
import { Switch, Route } from 'react-router-dom'
// import { setDefaultHeaderFromLocalStorage } from './Function/authentificationToken.js'
import { api } from './Services/Api.js'
import { userLogin } from './Redux/Actions/userLogin.js'

function App() {
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    // setDefaultHeaderFromLocalStorage()
    const getUserData = async () => {
      let data = await api.getProfile()
      if(localStorage.getItem('auth'))
      dispatch(userLogin(data.data))
    }
    getUserData()

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
