import axios from 'axios'

const apiKey = '9090b3cebaa3203829f4250080c1315d'

const openWeatherAPI = {
  current: {
    byCityName: (cityName) => axios.get( 'https://api.openweathermap.org/data/2.5/find',
      {
        params: {
          q: cityName,
          units: 'metric',
          appid: apiKey
        }
      }
    ),
    byID: (cityID) => axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          id: cityID,
          units: 'metric',
          appid: apiKey
        }
      }
    ),
  },
  hourly: {
    prevHours: ({ lat, lon, currentDate }) => axios.get(
      'http://api.openweathermap.org/data/2.5/onecall/timemachine',
      {
        params: {
          lat: lat,
          lon: lon,
          units: 'metric',
          appid: apiKey,
          exclude: 'daily,current,alerts',
          dt: currentDate.getTime() / 1000 // API gets date in seconds insted milliseconds
        }
      }
    ),
    nextHours: ({ lat, lon }) => axios.get(
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
    ),
  },
  weekly: {
    nextSevenDays: ({ lat, lon }) => axios.get(
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
  }
}

const weatherApi = {
  getCurrentWeather: async (cityName) => {
    let data = await openWeatherAPI.current.byCityName(cityName)

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
    let data = await openWeatherAPI.current.byID(cityID)

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
    const currentDate = new Date()
    currentDate.setHours(currentDate.getHours() - 1, 0, 0, 0)

    const [ dataHistorical, dataCurrent ] = await Promise.all([
      openWeatherAPI.hourly.prevHours({ lat, lon, currentDate }),
      openWeatherAPI.hourly.nextHours({ lat, lon })
    ])

    const retArrHistorical = dataHistorical.data.hourly.map( el => {
      return {
        temp: el.temp,
        weather: {
          id: el.weather[0].id,
          icon: el.weather[0].icon
        },
        date: new Date(el.dt * 1000) //Date comes in seconds
      }
    })

    retArrHistorical.pop() //Remove duplicate item (same comes in openWeatherAPI.hourly.nextHours)

    const retArrCurrent = dataCurrent.data.hourly
      .filter((el, index) => index < 23 - (retArrHistorical.length - 1) ? true : false)
      .map( el => {
        return {
          temp: el.temp,
          weather: {
            id: el.weather[0].id,
            icon: el.weather[0].icon
          },
          date: new Date(el.dt * 1000)
        }
      })

    return [...retArrHistorical, ...retArrCurrent]
  },
  getWeeklyWeather: async ({ lat, lon }) => {
    let weatherData = await openWeatherAPI.weekly.nextSevenDays({ lat, lon })

    weatherData.data.daily.pop() //Drop 8th elem > as need only 7

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
  },

  getDailyDataList: async function({ idList }){
    const promiseList = idList.map(el => this.getCurrentWeatherByCityID(el))
    const data = await Promise.all(promiseList)
    return data
  },
  getHourlyDataList: async function({ coordList }){
    const promiseList = coordList.map(el => this.getHourlyWeather(el))
    const data = await Promise.all(promiseList)
    return data
  },
  getWeeklyDataList: async function({ coordList }){
    const promiseList = coordList.map(el => this.getWeeklyWeather(el))
    const data = await Promise.all(promiseList)
    return data
  },
}

export default weatherApi
