import axios from 'axios'

const apiKey = 'c9e711e5794aade84f2deff499ce566f'

const weatherApi = {
  getCurrentWeather: async (cityName) => {
    let data = await axios.get(
      'https://api.openweathermap.org/data/2.5/find',
      {
        params: {
          q: cityName,
          units: 'metric',
          appid: apiKey
        }
      }
    )

    if(!data.data.list.length) return

    let cityWeatherRaw = data.data.list[0]

    let cityWeather = {
      id: cityWeatherRaw.id,
      name: cityWeatherRaw.name,
      wind: cityWeatherRaw.wind.speed,
      temperature: cityWeatherRaw.main.temp,
      coord: cityWeatherRaw.coord,
      pressure: cityWeatherRaw.main.pressure,
      humidity: cityWeatherRaw.main.humidity,
      weather: {
        icon: cityWeatherRaw.weather[0].icon,
        description: cityWeatherRaw.weather[0].main,
        id: cityWeatherRaw.weather[0].id
      }
    }

    return cityWeather
  },
  getCurrentWeatherByCityID: async (cityID) => {
    let data = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          id: cityID,
          units: 'metric',
          appid: apiKey
        }
      }
    )

    if(!data.data.cod >= 200 & !data.data.cod < 400) return

    let cityWeatherRaw = data.data

    let cityWeather = {
      id: cityWeatherRaw.id,
      name: cityWeatherRaw.name,
      wind: cityWeatherRaw.wind.speed,
      temperature: cityWeatherRaw.main.temp,
      coord: cityWeatherRaw.coord,
      pressure: cityWeatherRaw.main.pressure,
      humidity: cityWeatherRaw.main.humidity,
      weather: {
        icon: cityWeatherRaw.weather[0].icon,
        description: cityWeatherRaw.weather[0].main,
        id: cityWeatherRaw.weather[0].id
      }
    }

    return cityWeather
  },
  getHourlyWeather: async ({lat, lon}) => {
    let currentDate = new Date()
    currentDate.setHours(currentDate.getHours() - 1, 0, 0, 0)

    let dataHistorical = await axios.get(
      'http://api.openweathermap.org/data/2.5/onecall/timemachine',
      {
        params: {
          lat: lat,
          lon: lon,
          units: 'metric',
          appid: apiKey,
          exclude: 'daily,current,alerts',
          dt: currentDate.getTime() / 1000
        }
      }
    )

    let dataCurrent = await axios.get(
      'https://api.openweathermap.org/data/2.5/onecall',
      {
        params: {
          lat: lat,
          lon: lon,
          units: 'metric',
          appid: apiKey,
          exclude: 'daily,minutely,current,alerts'
        }
      }
    )

    const retArrHistorical = dataHistorical.data.hourly.map( el => {
      return {
        temp: el.temp,
        weather: {
          id: el.weather[0].id,
          icon: el.weather[0].icon
        }
      }
    })

    const retArrCurrent = dataCurrent.data.hourly
      .filter((el, index) => index < 23 - (retArrHistorical.length - 1) ? true : false)
      .map( el => {
        return {
          temp: el.temp,
          weather: {
            id: el.weather[0].id,
            icon: el.weather[0].icon
          }
        }
      })

    return [...retArrHistorical, ...retArrCurrent]
  },
  getWeeklyWeather: async ({lat, lon}) => {
    let weatherData = await axios.get(
      'https://api.openweathermap.org/data/2.5/onecall',
      {
        params: {
          lat: lat,
          lon: lon,
          units: 'metric',
          appid: apiKey,
          exclude: 'current,minutely,hourly,alerts'
        }
      }
    )

    weatherData.data.daily.pop()

    let retArr = weatherData.data.daily.map(el => {
      return {
        date: new Date( el.dt * 1000 ),
        temp: {
          min: el.temp.min,
          max: el.temp.max
        },
        weather: {
          icon: el.weather[0].icon,
          description: el.weather[0].main
        }
      }
    })

    return retArr
  }
}

export default weatherApi
