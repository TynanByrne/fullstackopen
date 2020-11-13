import React from 'react'
import { CoursePart } from '../types'
import { assertNever } from '../utils'

const Part: React.FC<{ part: CoursePart}> = ({ part }) => {
  switch (part.name) {
    case 'Fundamentals':
      return (
        <>
          <p>
            <b>{part.name}</b>
          </p>
          <p>
            Exercises: {part.exerciseCount}
          </p>
          <p>
            Description: {part.description}
          </p>
        </>
      )
    case 'Using props to pass data':
      return (
        <>
          <p>
            <b>{part.name}</b>
          </p>
          <p>
            Exercises: {part.exerciseCount}
          </p>
          <p>
            Group projects: {part.groupProjectCount}
          </p>
        </>
      )
    case 'Deeper type usage':
      return (
        <>
          <p>
            <b>{part.name}</b>
          </p>
          <p>
            Exercises: {part.exerciseCount}
          </p>
          <p>
            Description: {part.description}
          </p>
          <p>
            Exercise submission link: {part.exerciseSubmissionLink}
          </p>
        </>
      )
    case 'Building a new course part':
      return (
        <>
          <p>
            <b>{part.name}</b>
          </p>
          <p>
            Exercises: {part.exerciseCount}
          </p>
          <p>
            Description: {part.description}
          </p>
          <p>
            Writer: {part.writer}
          </p>
        </>
      )
    default: return assertNever(part)
  }
}

export default Part