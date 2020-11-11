import { useLazyQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { ALL_BOOKS } from '../queries'

const Recommendations = ({ show, genreResult }) => {

  const [getRecommendations, result] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    console.log(result.data)
    if (genreResult.data) {
      getRecommendations({
        variables: {
          genre: genreResult.data.me?.favouriteGenre
        }
      })
      console.log(result.data)
    }
  }, [genreResult.data, getRecommendations, result.data])

  const recommendedBooks = () => (
    result.loading
    ? null
    : result.data?.allBooks.map(x => 
      <tr key={x.title}>
        <td>{x.title}</td>
        <td>{x.author.name}</td>
        <td>{x.published}</td>
      </tr>
      ))

  if (!show) return null

  return genreResult.loading ? null : (
    <div>
      <h2>Recommendations</h2>

      <div>Books in your favourite genre <b>{genreResult.data?.me?.favouriteGenre}</b></div>
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
          {recommendedBooks()}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
