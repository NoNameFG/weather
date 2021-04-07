import './withError.scss'

const withError = Component => (props) => {
  const { additionalClassName, errors, name } = props

  return (
    <div className="template-wrapper">
    {
      errors[name] ?
        <Component
          {...props}
          additionalClassName={
            additionalClassName ?
              `${additionalClassName} template-field--error`
              :
              'template-field--error'
          }
        />
        :
        <Component {...props}/>
    }

    </div>
  )
}

export default withError
