const Indicator = ({name, value, units,}) => (
  <div className="city-weather__container-daily__indicators-importance">
    <span>{ name }:</span>
    { value + units }
  </div>
)

export default Indicator
