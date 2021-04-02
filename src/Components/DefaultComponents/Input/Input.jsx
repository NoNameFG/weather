import './Input.scss'

const DefaultInput = ({onChange, name, placeholder, type, additionalClassName, value}) => {
  return(
    <div className={`template-field${additionalClassName ? ' ' + additionalClassName : ''}`}>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        className="template-field-input"
        name={name}
      />
    </div>
  )
}

export default DefaultInput
