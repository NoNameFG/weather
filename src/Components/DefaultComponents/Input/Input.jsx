import './Input.scss'

const DefaultInput = ({ additionalClassName, ...rest}) => {
  // const {additionalClassName, onChange, value, placeholder, type, name ...} = props

  return(
    <div className={`template-field${additionalClassName ? ' ' + additionalClassName : ''}`}>
      <input
        className="template-field-input"
        { ...rest }
      />
    </div>
  )
}

export default DefaultInput
