const profileIcon = ComponentSVG => ({className, onClick}) => {
  return(
    <button onClick={onClick} className={className}>
      <ComponentSVG/>
    </button>
  )
}

export default profileIcon
