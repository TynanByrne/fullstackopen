import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import useField from '../hooks/useField'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS, ALL_BOOKS } from '../queries'

const Authors = ({ show, authors }) => {
  const { reset: resetBirthyear, ...birthyear } = useField('number')
  const [selectedOption, setSelectedOption] = useState(null)
  console.log(authors)

  const options = authors.map(a => {
    return { value: a.name, label: a.name }
  })

  const [ changeAuthor, result ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS }, { query: ALL_BOOKS } ]
  })

  const submit = (event) => {
    event.preventDefault()

    changeAuthor({ variables: { name: selectedOption.value, setBornTo: parseInt(birthyear.value) }})
    setSelectedOption(null)
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
        <Select
          defaultvalue={selectedOption}
          onChange={setSelectedOption}
          options={options}
          placeholder='Select author'
          autoFocus
        />
        <div>
          birthyear <input {...birthyear} />
        </div>
        <button type='submit'>Update author</button>
      </form>
    </div>
  )
}

export default Authors
