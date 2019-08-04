import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => {
    return (
        <div>
            <button onClick={handleClick}>{text}</button>
        </div>
    )
}

const Quote = ({ votes }) => {
    const max = Math.max(...votes)
    const indexOfMax = votes.indexOf(max)
    return (
        <div>
            <h2>
                Anecdote with the most votes:
            </h2>
            <p>
                {anecdotes[indexOfMax]}
            </p>
        </div>
    )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0))

  const randomQuote = () => {
      const randomIndex = Math.floor(Math.random() * anecdotes.length)
      setSelected(randomIndex)
  }

  const voteQuote = () => {
      const newArray=[...votes]
      newArray[selected] = votes[selected] + 1
      setVotes(newArray)
  }

  return (
    <div>
        <h2>Quote of the day</h2>
        {props.anecdotes[selected]}
        <Button handleClick={voteQuote} text='vote'/>
        <Button handleClick={randomQuote} text='next anecdote'/>
        <Quote votes={votes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)