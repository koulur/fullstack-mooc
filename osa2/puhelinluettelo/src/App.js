import React, { useState } from 'react'


const Numbers = ({ persons }) => {
  return (
    <div>
      <h2>Numbers</h2>
    <table>
      <tbody>
        {persons.map((person) => 
        (<tr key={person.name}>
          <td>
            {person.name}
          </td>
          <td>
            {person.number}
          </td>
        </tr>))}
      </tbody>
    </table>
    </div>
  )
}

const Filter = ({ newFilter, handleNewFilter}) => {
  return (
    <div>
      <h2>Phonebook</h2>
      filter: <input value={newFilter} onChange={handleNewFilter}/>
    </div>
  )
}

const Form = (props) => {
  const {newName, handleNewName, newNumber, handleNewNumber, handleSubmit} = props
  return (
    <form>
        <h2>Add numbers</h2>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
 

  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleNewFilter = (e) => {
    setNewFilter(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(persons.findIndex(
            element => element.name === newName
        ) !== -1 ) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat({name: newName, number: newNumber}))
    setNewName('')
    setNewNumber('')
  }

  
  return (
    <div>
      <Filter newFilter={newFilter} handleNewFilter={handleNewFilter}/>
      <Form newName={newName} handleNewName={handleNewName} 
            newNumber={newNumber} handleNewNumber={handleNewNumber}
            handleSubmit={handleSubmit} />
      <Numbers persons = {persons.filter((person) => person.name.includes(newFilter))}/>
    </div>
  )

}

export default App