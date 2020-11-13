import React from 'react'
import Part from './Part'
import { CoursePart } from '../types'

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {

  return (
    <>
     {courseParts.map(c => (
       <Part key={c.name} part={c} />
     ))}
    </>
  )
}

export default Content