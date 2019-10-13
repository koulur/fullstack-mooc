import React from "react"
import { addAnecdote } from "../reducers/anecdoteReducer"

const add = ({ event, store }) => {
  event.preventDefault()
  const content = event.target.anecdote.value
  event.target.anecdote.value = ""
  store.dispatch(addAnecdote(content))
}

const AnecdoteForm = ({ store }) => {
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={event => add({ event, store })}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
