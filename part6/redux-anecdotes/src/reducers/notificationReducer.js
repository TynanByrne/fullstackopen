const initialState = { 
  message: 'This is a message',
  visible: true
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
    data: { visible: false }
  }
}

export const setNotification = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    data: { message, visible: true }
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