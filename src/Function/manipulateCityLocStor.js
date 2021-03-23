export const addToLocalStorage = cityID => {
  let cityList = JSON.parse(localStorage.getItem('cityList'))
  let strArr = []

  if(cityList){
    strArr = JSON.stringify([...cityList, cityID])
  } else {
    strArr = JSON.stringify([cityID])
  }

  localStorage.setItem('cityList', strArr)
}

export const removeFromLocalStorage = cityID => {
  let cityList = JSON.parse(localStorage.getItem('cityList'))

  let strArr = JSON.stringify(cityList.filter(el => cityID !== el))

  if(strArr.length){
    localStorage.setItem('cityList', strArr)
  } else {
    localStorage.removeItem('cityList')
  }

}
