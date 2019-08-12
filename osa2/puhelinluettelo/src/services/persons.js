import axios from 'axios'


const url = 'http://localhost:3001/persons'


const getAll = async (setPersons) => {
    const response = await axios.get(url);
    return setPersons(response.data);
}

const create = ({newName, newNumber, setNewName, setNewNumber}) => {
    axios.post(url, 
              {name: newName, number: newNumber})
          .then(() => {
            setNewName('')
            setNewNumber('')
            }
          )
}

const remove = ({id, persons, setPersons}) => {
    axios.delete(`${url}/${id}`)
          .then(response => {
              setPersons(
                   persons.filter(person => person.id !== id)
              )
          })
          .catch(error => console.log(error)
          )
}

const replace = ({person, persons, setPersons}) => {
    axios.put(`${url}/${person.id}`, person)
         .then(response => {
             console.log(response)
            setPersons(
                [...persons.filter(element => element.id !== person.id), person]
            )
        })
}



export {
    getAll,
    create,
    remove,
    replace
}