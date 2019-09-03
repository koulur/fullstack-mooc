import axios from 'axios'


const url = '/api/persons'


const getAll = async (setPersons) => {
    const response = await axios.get(url);
    return setPersons(response.data);
}


const create = ({newName, newNumber, setNewName, setNewNumber, setMessage, setStatus, setPersons, persons}) => {
    const name = newName
    
    axios.post(url, 
              {name: newName, number: newNumber})
          .then(response => {
            setStatus(true)
            console.log('response: ', response)
            setMessage(`Succesfully created an entry for ${name}`)
            setPersons([...persons, response.data])

            setNewName('')
            setNewNumber('')
            

            setTimeout(() => {
                setMessage(null)
            }, 5000)
            }
          )
          .catch((error) => {
              setStatus(false)
              setMessage(error.response.data.error)
              console.log('Error in UI: ', error.response.data.error)

              setNewName('')
              setNewNumber('')

              setTimeout(() => {
                setMessage(null)
            }, 5000)
          })
}

const remove = ({id, persons, setPersons, setMessage, setStatus}) => {
    const personName = persons.find((person) => person.id === id).name
    axios.delete(`${url}/${id}`)
          .then(response => {
              setStatus(true)
              setMessage(`Successfully removed ${personName}`)
              setPersons(
                   persons.filter(person => person.id !== id)
              )
              
              setTimeout(() => {
                setMessage(null)  
              }, 5000)
          })
          .catch(error => {
              setStatus(false)
              setMessage(`Was not able to succesfully remove ${personName}`)
              

              setTimeout(() => {
                setMessage(null)  
              }, 5000)

              console.log(error)
            }
          )
}

const replace = ({person, persons, setPersons, setMessage, setStatus, setNewName, setNewNumber}) => {
    axios.put(`${url}/${person.id}`, person)
         .then(response => {
            console.log(response)
            setStatus(true)
            setMessage(`Successfully replaced ${person.name}'s number.`)
            setPersons(
                [...persons.filter(element => element.id !== person.id), person]
            )

            setNewName('')
            setNewNumber('')

            setTimeout(() => {
                setMessage(null)
                }, 5000)
            }
        )
        .catch((error) => {
            setStatus(false)
            setMessage(`Was not able to successfully replace ${person.name}'s number.`)

            setTimeout(() => {
                setMessage(null)
            }, 5000)
            
        })
}



export {
    getAll,
    create,
    remove,
    replace
}