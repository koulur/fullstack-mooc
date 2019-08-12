import React, { useState, useEffect } from 'react'
import {getAll, create, remove, replace} from './services/persons'


const Numbers = ({ persons, newFilter, handleRemove }) => {
  const filtered = persons.filter((person) => person !== undefined).filter((person) => person.name.includes(newFilter))
  return (
    <div>
      <h2>Numbers</h2>
    <table>
      <tbody>
        {filtered.map((person, index) => 
        (<tr key={index}>
          <td>
            {person.name}
          </td>
          <td>
            {person.number}
          </td>
          <td>
            <button onClick={handleRemove(person.id)}>remove</button>
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
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState()

  useEffect(() => {
    getAll(setPersons)
  }, [newPerson])
  

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
    if(persons.findIndex(element => element.name === newName) !== -1 ) {
      if(window.confirm(`${newName} is already in the phonebook. Would you like to replace the old number?`)) {
        replace({person: {...persons.find(person => person.name === newName), number: newNumber}, persons, setPersons})
        return
      }
    }
    setNewPerson({name: newName, number: newNumber})
    setPersons(persons.concat(newPerson))
    
    create({newName, newNumber, setNewName, setNewNumber})
  }

  const handleRemove = (id) => () => {
    if(window.confirm(`Are you sure you want to remove ${persons.find(person => person.id === id).name}?`)){
      remove({id, persons, setPersons})
    }
  }

  
  return (
    <div>
      <Filter newFilter={ newFilter } 
              handleNewFilter={ handleNewFilter }/>

      <Form newName={ newName } 
            handleNewName={ handleNewName } 
            newNumber={ newNumber } 
            handleNewNumber={ handleNewNumber }
            handleSubmit={ handleSubmit } />

      <Numbers persons={ persons } 
               newFilter={ newFilter }
               handleRemove={ handleRemove} />
    </div>
  )
}


export default App