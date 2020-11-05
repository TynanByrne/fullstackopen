import React from 'react'
import useField from '../hooks/useField'
import { setNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/loginReducer'

const Login = ({ dispatch }) => {
  const { reset: resetUsername, ...usernameInput } = useField('text')
  const { reset: resetPassword, ...passwordInput } = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(loginUser(usernameInput.value, passwordInput.value))
      resetUsername()
      resetPassword()
      console.log('logged in')
    } catch (exception) {
      console.error(exception)
      resetUsername()
      resetPassword()
      dispatch(setNotification('Wrong username or password', 'error', 3))
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input id= "username" {...usernameInput} name="Username" placeholder="Username" />
      </div>
      <div>
        password
        <input id="password" {...passwordInput} name="Password" placeholder="Password" />
      </div>
      <div>
        <button id="login-button" type="submit">Log in</button>
      </div>
    </form>
  )

}

export default Login