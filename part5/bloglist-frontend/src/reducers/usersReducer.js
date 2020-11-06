import userService from '../services/users'

const initialState = []

export const allUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export const newUser = (newUser) => {
  return async dispatch => {
    const user = await userService.createUser(newUser)
    dispatch({
      type: 'NEW_USER',
      data: user
    })
  }
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    case 'NEW_USER':
      return [...state, action.data]
    default: return state
  }
}

export default usersReducer