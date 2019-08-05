import React from 'react'
import ReactDOM from 'react-dom'

const Header = props =>
  <h1>{props.course}</h1>

const Total = ({ parts }) => {
 
    const total = parts.reduce(
                (previous, current) => 
                (previous + current.exercises), 0
    )
    return (
            <h3>Total of {total} exercises</h3>
    )
}
  

const Part = props =>
  <p>{props.course.name} {props.course.exercises}</p>

const Content = ({ courses }) => (
  <div>
    {courses.parts.map((course) => <Part key={course.id} course={course}/>)}
  </div>
)
const Course = ({ course }) => {
    return (
    <div>
        <Header course={course.name}/>
        <Content courses={course}/>
        <Total parts={course.parts}/>
    </div>
    )
}
const App = () => {
    const course = {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
            name: 'Redux',
            exercises: 11,
            id: 4
        },
      ]
    }
  
    return (
      <div>
        <Course course={course} />
      </div>
    )
  }

ReactDOM.render(
  <App />,
  document.getElementById('root')
)