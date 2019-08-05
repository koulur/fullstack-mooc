import React from 'react'
import ReactDOM from 'react-dom'

const Header = ( {course} ) => (
    <>
        <h1>{course}</h1>
    </>
)
const Part = ( {props} ) => {
    const {name, exercises} = props
    return (
    <>
        <p>{name} {exercises}</p>
    </>
    )
}
const Content = ({parts}) => (
    <>
        {parts.map((part, index) => (<Part props={part} key={index}/>))}
    </>
)

const Total = ({parts}) => (
    <>
        <p>
            Number of exercises
                    {' ' + parts.reduce(
                        (accumulator, currentValue) => (accumulator + currentValue.exercises)
                        , 0)   
                    }
        </p>
    </>
)

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            name: 'State of a component',
            exercises: 14
          }
        ]
      }
  

  return (
    <div>
      <Header course={course.name} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))