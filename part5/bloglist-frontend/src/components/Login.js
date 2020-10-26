import React from 'react'
const Login = ({ onSubmit, username, password, handleUsernameChange, handlePasswordChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        username
        <input id= "username" type="text" value={username} name="Username"placeholder="Username"
          onChange={handleUsernameChange} />
      </div>
      <div>
        password
        <input id="password" type="password" value={password} name="Password" placeholder="Password"
          onChange={handlePasswordChange} />
      </div>
      <div>
        <button id="login-button" type="submit">Log in</button>
      </div>
    </form>
  )

}

export default Login