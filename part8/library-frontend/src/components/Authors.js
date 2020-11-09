
import React, { useEffect } from 'react'
import useField from '../hooks/useField'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS, ALL_BOOKS } from '../queries'

const Authors = ({ show, authors }) => {
  const { reset: resetName, ...name } = useField('text')
  const { reset: resetBirthyear, ...birthyear } = useField('number')

  const [ changeAuthor, result ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS }, { query: ALL_BOOKS } ]
  })

  const submit = (event) => {
    event.preventDefault()

    changeAuthor({ variables: { name: name.value, setBornTo: parseInt(birthyear.value) }})
    resetName()
    resetBirthyear()
  }

  useEffect(() => {
    if (result.data && !result.data.editAuthor) {
      console.error('person not found')
    }
  }, [result.data])
  if (!show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name <input {...name} />
        </div>
        <div>
          birthyear <input {...birthyear} />
        </div>
        <button type='submit'>Update author</button>
      </form>
    </div>
  )
}

export default Authors
