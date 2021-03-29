const backgroundImageWidgetConverter = id => {
  if(id < 300) {
    return 'Thunderstorm'
  }
  if(id < 600) {
    return 'Rain'
  }
  if(id < 700) {
    return 'Snow'
  }
  if(id < 800) {
    return 'Mist'
  }
  if(id === 800) {
    return 'Clear'
  }
  if(id < 900) {
    return 'Clouds'
  }
  return 'Clear'
}

export default backgroundImageWidgetConverter
