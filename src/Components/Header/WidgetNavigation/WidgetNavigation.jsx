import WidgetMenu from './WidgetMenu.jsx/WidgetMenu.jsx'
import { useState } from 'react'

const WidgetNavigation = () => {
  const [ isOpen, setIsOpen ] = useState(false)


  return(
    <div className="header__widget-navigation">
      <button
        className="header__widget-navigation__button"
        onClick={() => setIsOpen(true)}
      >
        <span className="header__widget-navigation__button-line"></span>
        <span className="header__widget-navigation__button-line"></span>
        <span className="header__widget-navigation__button-line"></span>
      </button>

      { isOpen && <WidgetMenu setIsOpen={setIsOpen}/> }
    </div>
  )
}

export default WidgetNavigation
