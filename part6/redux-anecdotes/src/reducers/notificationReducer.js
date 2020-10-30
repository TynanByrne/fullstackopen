const initialState = { 
  visible: false
}

export const setNotification = (message, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message, visible: true }
    })
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
        data:  { visible: false }
      })
    }, timeout * 1000)
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REMOVE_NOTIFICATION': 
      return action.data
    case 'SET_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

export default notificationReducer