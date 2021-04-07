import { useState } from 'react'
import './withUnactive.scss'

const withUnactive = Component => (props) => {
  const { placeholder, unactiveValue, value, type } = props
  const [ isActive, setIsActive ] = useState(false)

  const handleFocusOut = () => {
    setIsActive(false)
  }

  const showValue = () => {
    if(value){
      if(type === 'password') return value.replace(/./g, '*')
      return value
    }
    return unactiveValue
  }

  return(
    isActive ?
    <Component onBlur={handleFocusOut} autoFocus={true} { ...props }/>
    :
    <div className="input-field--unactive" onClick={() => setIsActive(true)}>
      <div className="input-field--unactive-name">{ placeholder }:</div>
      <div className="input-field--unactive-value">{ showValue() }</div>
    </div>
  )
}

export default withUnactive
