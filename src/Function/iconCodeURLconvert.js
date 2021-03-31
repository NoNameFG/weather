const openweatherIcon = code => `http://openweathermap.org/img/wn/${code}@4x.png`
const bmcdnIcon = code => {
  const initURL = 'https://bmcdn.nl/assets/weather-icons/all/'
  switch (code) {
    case '01d':
    default:
      return initURL + 'clear-day.svg'
    case '01n':
      return initURL + 'clear-night.svg'
    case '02d':
      return initURL + 'partly-cloudy-day.svg'
    case '02n':
      return initURL + 'partly-cloudy-night.svg'
    case '03d':
    case '03n':
      return initURL + 'cloudy.svg'
    case '04d':
    case '04n':
      return initURL + 'overcast.svg'
    case '09d':
    case '09n':
      return initURL + 'rain.svg'
    case '10d':
      return initURL + 'partly-cloudy-day-rain.svg'
    case '10n':
      return initURL + 'partly-cloudy-night-rain.svg'
    case '11d':
    case '11n':
      return initURL + 'thunderstorms.svg'
    case '13d':
    case '13n':
      return initURL + 'snow.svg'
    case '50d':
    case '50n':
      return initURL + 'mist.svg'
  }
}

export const iconSource = {
  OPENWEATHER: 'OPENWEATHER',
  BMCDN: 'BMCDN'
}

export const iconCodeURLconvert = (code, source) => {
  switch (source) {
    case iconSource.BMCDN:
      return bmcdnIcon(code)
    case iconSource.OPENWEATHER:
    default:
      return openweatherIcon(code)
  }
}
