const initialState = {
  visible: false,
  type: null,
  message: null
}

export const setNotification = (message, type, timeout) => {
  return async dispatch => {
    if (type === 'success') {
      dispatch({
        type: 'SUCCESS_NOTIFICATION',
        data: {
          message,
          visible: true,
          timeoutID: null,
          type: 'success'
        }
      })
    } else {
      dispatch({
        type: 'ERROR_NOTIFICATION',
        data: {
          message,
          visible: true,
          timeoutID: null,
          type: 'error'
        }
      })
    }
    const timeoutID = setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
        data: { visible: false, timeoutID: null }
      })
    }, timeout * 1000)
    dispatch({
      type: 'SET_TIMEOUTID',
      timeoutID
    })
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REMOVE_NOTIFICATION':
      return action.data
    case 'SUCCESS_NOTIFICATION':
      if (state.timeoutID) {
        clearTimeout(state.timeoutID)
      }
      return action.data
    case 'ERROR_NOTIFICATION':
      if (state.timeoutID) {
        clearTimeout(state.timeoutID)
      }
      return action.data
    case 'SET_TIMEOUTID':
      return { ...state, timeoutID: action.timeoutID }
    default:
      return state
  }
}

export default notificationReducer