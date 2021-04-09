import React, { useState } from 'react'
import { ReactComponent as SearchSVG } from '../../Dist/Header/SearchSVG.svg'
import './Header.scss'
import { useDispatch, useSelector } from 'react-redux'
import { addNewCity } from '../../Redux/Thunk/addNewCity.js'
import WidgetNavigation from './WidgetNavigation/WidgetNavigation.jsx'
import ProfileInteraction from './ProfileInteraction/ProfileIntercation.jsx'

const Header = () => {
  const [ city, setCity ] = useState('')
  const {existCities, isLoggedin} = useSelector(state => ({existCities: state.widgetsData, isLoggedin: state.userData.isLoggedin}))

  const dispatch = useDispatch()

  const addCity = async e => {
    e.preventDefault()

    dispatch(addNewCity({ index: existCities.length, city, existCities, isLoggedin }))
    setCity('')
  }

  const handleChange = e => {
    setCity(e.target.value)
  }

  return(
    <header className="header">
      <WidgetNavigation/>

      <ProfileInteraction/>

      <form className="header__search" onSubmit={addCity}>
        <div className="header__search-icon">
          <SearchSVG/>
        </div>

        <input
          value={city}
          onChange={handleChange}
          type="text"
          className="header__search-field"
        />

        <button type="submit" className="header__search-button">
          + Add city
        </button>
      </form>
    </header>
  )
}

export default Header
