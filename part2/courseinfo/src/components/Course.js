import React from 'react'
import Content from './Content'

const Course = ({ course }) => {
    return (
      <div>
        {course.map(course => 
          <Content key={course.id} course={course}
          />)}
      </div>
    )
  }

  export default Course