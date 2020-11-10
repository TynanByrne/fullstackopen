import React, { useEffect } from 'react'
import useField from '../hooks/useField'
import { useMutation } from '@apollo/client'
import { LOGIN, ALL_AUTHORS, ALL_BOOKS } from '../queries'

const LoginForm = ({ show, setToken, setLoggedIn, setPage }) => {
  const { reset: usernameReset, ...username } = useField('text')
  const { reset: passwordReset, ...password } = useField('password')

  const [ login, result ] = useMutation(LOGIN, {
    refetchQueries: [ { query: ALL_AUTHORS }, { query: ALL_BOOKS } ]
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('libraryApp-user-token', token)
    }
  }, [result.data, setToken])

  const submit = (event) => {
    event.preventDefault()

    login({ variables: { username: username.value, password: password.value }})
    setLoggedIn(true)
    usernameReset()
    passwordReset()
    setPage('authors')
  }

  if (!show) {
    return null
  }

  return (
    <>
      <form onSubmit={submit}>
        <input placeholder='username' {...username} />
        <input placeholder='password' {...password} />
        <button type='submit'>log in</button>
      </form>
    </>
  )
}

export default LoginForm