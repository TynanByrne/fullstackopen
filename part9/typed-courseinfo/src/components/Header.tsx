import React from 'react'
import { CourseName } from '../types'

const Header: React.FC<CourseName> = ({ courseName }) => {
  return (
    <>
      <h1>{courseName}</h1>
    </>
  )
}

export default Header