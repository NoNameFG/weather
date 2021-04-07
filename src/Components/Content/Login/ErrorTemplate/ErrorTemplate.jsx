import { ReactComponent as AttentionSVG } from '../../../../Dist/Content/Input/attention.svg'
import { ReactComponent as CloseSVG } from '../../../../Dist/Content/Input/cancel.svg'


const ErrorTemplate = ({ isOpen = false, handleClose }) => {
  return(
    isOpen &&
    <div className="login__template-error">
      <div className="login__template-error-sign">
        <AttentionSVG/>
      </div>
      <div className="login__template-error-description">
        Wrong Email or Password. Try again.
      </div>
      <button className="login__template-error-close" onClick={handleClose}>
        <CloseSVG/>
      </button>
    </div>
  )
}

export default ErrorTemplate
