import * as ActionStages from '../../Constants/ActionStages.js'

export const createAction = type => {
  const actionTypes = {
  }

  Object.values(ActionStages).forEach(el => {
    actionTypes[el] = (payload) => ({
      type: `${type}_${el}`,
      payload: payload
    })
  })

  return actionTypes
}
