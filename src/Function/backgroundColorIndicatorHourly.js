import { dangerousCodes, moderatelyDangerousCodes } from '../Constants/DangerousCodes.js'

const backgroundColorIndicatorHourly = id => {
  if(dangerousCodes.includes(id)) {
    return '#e60026'
  }
  if(moderatelyDangerousCodes.includes(id)) {
    return '#ff6600'
  }
  if(id >= 800) {
    return '#ffffff'
  }
  else {
    return '#00e600'
  }
}

export default backgroundColorIndicatorHourly
