import React, { useState } from 'react'

const Books = ({ show, books }) => {
  const [selectedGenre, setSelectedGenre] = useState('all genres')

  const allGenres = books.map(b => b.genres).flat(Infinity)
  let genres = [...new Set(allGenres)]
  console.log(genres)


  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <div>Selected genre: {selectedGenre}</div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.filter(b => (selectedGenre === 'all genres')
          ? b : b.genres.includes(selectedGenre)).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {genres.map(g =>
          <button key={g} onClick={() => setSelectedGenre(g)}>{g}</button>
        )}
        <button onClick={() => setSelectedGenre('all genres')}>all genres</button>
      </div>
    </div>
  )
}

export default Books