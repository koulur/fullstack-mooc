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
        </tr>))}
      </tbody>
    </table>
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(persons.findIndex(
            element => element.name === newName
        ) !== -1 ) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat({name: newName}))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
      <Numbers persons = {persons}/>
    </div>
  )

}

export default App