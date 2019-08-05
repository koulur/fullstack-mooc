import React from 'react'

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

export default Course