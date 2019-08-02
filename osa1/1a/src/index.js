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
const Content = ({exercises}) => (

    <div>
        <Part props={exercises[0].part1}/>
        <Part props={exercises[1].part2}/>
        <Part props={exercises[2].part3}/>
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
    const part1 = {
      name: 'Fundamentals of React',
      exercises: 10
    }
    const part2 = {
      name: 'Using props to pass data',
      exercises: 7
    }
    const part3 = {
      name: 'State of a component',
      exercises: 14
    }
  

  return (
    <div>
      <Header course={course} />
      <Content exercises = {[{part1},
                           {part2},
                           {part3}]} />
      <Total exercises = {[part1.exercises, part2.exercises, part3.exercises]}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))