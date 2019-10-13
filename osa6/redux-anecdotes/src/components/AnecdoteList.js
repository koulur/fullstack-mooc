import React from "react"
import { voteForAnecdote } from "../reducers/anecdoteReducer"

const vote = ({ id, store }) => {
  store.dispatch(voteForAnecdote(id))
}

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState()
  return (
    <>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote({ id: anecdote.id, store })}>
                vote
              </button>
            </div>
          </div>
        ))}
    </>
  )
}

export default AnecdoteList
