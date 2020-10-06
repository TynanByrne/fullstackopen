import React from 'react'

const Total = ({ course }) => {
    const sum = course.parts.reduce((t, x) => t + x.exercises, 0)
    return (
      <p><b>Number of exercises {sum}</b></p>
    )
  }

export default Total