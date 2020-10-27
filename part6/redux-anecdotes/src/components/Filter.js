import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { filter } from '../reducers/filterReducer'

const Filter = () => {
  const anecdotes = useSelector(state => state.filter)
  const dispatch = useDispatch()
  const handleChange = (event) => {
    event.preventDefault()
    const filterTerm = event.target.value
    dispatch(filter(filterTerm))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter