import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Numbers = ({ persons, newFilter }) => {
  console.log('persons from number: ', persons)
  const filtered = persons.filter((person) => person !== undefined).filter((person) => person.name.includes(newFilter))
  return (
    <div>
      <h2>Numbers</h2>
    <table>
      <tbody>
        {filtered.map((person) => 
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
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState()

  useEffect(() => {
    console.log('persons from useEffect: ', persons)
    axios
        .get('http://localhost:3001/persons')
        .then(response => {
          setPersons(response.data)
        })
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
    if(persons.findIndex(
            element => element.name === newName
        ) !== -1 ) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setNewPerson({name: newName, number: newNumber})
    setPersons(persons.concat(newPerson))
    

    axios.post('http://localhost:3001/persons', 
              {name: newName, number: newNumber})
          .then(() => {
            setNewName('')
            setNewNumber('')
            }
          )

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
               newFilter={ newFilter } />
    </div>
  )

}


export default App