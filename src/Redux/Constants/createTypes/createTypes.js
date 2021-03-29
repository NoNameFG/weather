import * as ActionStages from '../../Constants/ActionStages.js'

export const createTypes = type => {
  const types = {}

  Object.values(ActionStages).forEach(el => {
    types[el] = `${type}_${el}`
  })

  return types
}
