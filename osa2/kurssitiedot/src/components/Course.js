import React from 'react'

const Course = ({course}) => {
    return (
      <>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </>
    )
  }

  const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const sum = course.parts.reduce( (accumulator, currentValue) => {
      return accumulator + currentValue.exercises
    }, 0)
    return(
      <p>Number of exercises {sum}</p>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part =>
          <div key={part.id}>
            {<Part part = {part}/>}
          </div>  
        )}
      </div>
    )
  }

export default Course