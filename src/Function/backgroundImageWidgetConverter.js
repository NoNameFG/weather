const backgroundImageWidgetConverter = id => {
  if(id >= 200 && id < 300) {
    return 'Thunderstorm'
  }
  if(id >=300 && id < 600) {
    return 'Rain'
  }
  if(id >=600 && id < 700) {
    return 'Snow'
  }
  if(id >=700 && id < 800) {
    return 'Mist'
  }
  if(id === 800) {
    return 'Clear'
  }
  if(id >= 801 && id < 900) {
    return 'Clouds'
  }
  return 'Clear'
}

export default backgroundImageWidgetConverter
