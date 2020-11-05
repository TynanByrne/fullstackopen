import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const initialState = null

export const loginUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username, password
    })
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
    dispatch({
      type: 'LOGIN_USER',
      data: user
    })
    dispatch(setNotification(`Logged in as ${username}`, 'success', 4))
  }
}

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({ type: 'LOGOUT_USER' })
  }
}

export const loginFromLocalStorage = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({
        type: 'LOGIN_USER',
        data: user
      })
    }
  }
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGOUT_USER':
      return null
    case 'LOGIN_USER':
      return action.data
    default: return state
  }
}

export default loginReducer