import './withError.scss'
import { ReactComponent as AttentionSVG } from '../../../Dist/Content/Input/attention.svg'


const withTooltip = Component => (props) => {
  const { errors, name } = props

  return (
    <>
      <Component {...props}/>
      {
        errors[name] &&
        <div className="template-wrapper-error__attention">
          <AttentionSVG/>
          <div className="template-wrapper-error__attention-tooltip">
            { errors[name] }
          </div>
        </div>
      }
    </>
  )
}

export default withTooltip
