import { buttonTypes } from './buttonTypes.js'
import './Button.scss'

const DefaultButton = ({onClick, onSubmit, type, text, additionalClassName}) => {
  const generateClassName = () => {
    switch (type) {
      case buttonTypes.PRIMARY:
        return 'template-button--primary'
      case buttonTypes.SECONDARY:
      default:
        return 'template-button--secondary'
    }
  }

  const classNameCompose = () => {
    return `template-button ${generateClassName()}${additionalClassName ? ' ' + additionalClassName : ''}`
  }

  return(
    <button onClick={onClick} onSubmit={onSubmit} className={classNameCompose()}>
      <div>
        {text}
      </div>
    </button>
  )
}

export default DefaultButton
