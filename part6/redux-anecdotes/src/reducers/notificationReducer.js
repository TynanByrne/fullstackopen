const initialState = { 
  visible: false,
  timeoutID: null
}

export const setNotification = (message, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message, visible: true, timeoutID: null }
    })
    const timeoutID = setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
        data:  { visible: false, timeoutID: null }
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
    case 'SET_NOTIFICATION':
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