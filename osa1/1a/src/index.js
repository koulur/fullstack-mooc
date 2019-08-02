import React from 'react'
import ReactDOM from 'react-dom'

const Header = ( {course} ) => (
    <>
        <h1>{course}</h1>
    </>
)
const Part = ( {part, exercise} ) => (
    <>
        <p>{part} {exercise}</p>
    </>
)
const Content = ({exercises}) => (
    <div>
        <Part part={exercises[0]['part']} exercise={exercises[0]['exercise']} /> 
        <Part part={exercises[1]['part']} exercise={exercises[1]['exercise']} />
        <Part part={exercises[2]['part']} exercise={exercises[2]['exercise']} />
    </div>
)

const Total = ({exercises}) => (
    <>
        <p>
            Number of exercises
                    {' ' + exercises.reduce((previous, current) => 
                        (previous + current))}
        </p>
    </>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content exercises={[{'exercise': exercises1, 'part': part1},
                           {'exercise': exercises2, 'part': part2},
                           {'exercise': exercises3, 'part': part3}]} />
      <Total exercises = {[exercises1, exercises2, exercises3]}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))