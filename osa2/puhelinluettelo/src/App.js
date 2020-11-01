import React, { useEffect, useState } from 'react'
import personService from './services/persons'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService.getAll()
    .then(response => {
      setPersons(response.data)
    })
  }, [])
  
  const addPerson = (event) => {
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName && typeof person.id !== "undefined")) {
      event.preventDefault()
      const personToBeRemoved = persons.find(person => person.name === newName)
      if(window.confirm(`${newName} is already in the phonebook. Overwrite?`)) {
        personService.replace(personToBeRemoved, personObject).then(response =>{
          setPersons(persons.map(person => person.name === personObject.name ? personObject : person ))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`${personObject.name}'s number updated successfully`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        }).catch(error => {
          setErrorMessage(`Error! ${personObject.name} has already been removed from the server.`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      }
      else {
        setNewName('')
        setNewNumber('')
      }
    }
    else if (persons.some(person => person.name === newName)) {
      event.preventDefault()
      const person = persons.find(person => person.name === newName)
      setErrorMessage(`Please refresh the page to edit ${person.name}'s number`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    else {
      event.preventDefault()
      personService.create(personObject)
      .then(response => {
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
        setSuccessMessage(`${personObject.name} was added to the phone book`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
    }
  }

  const deletePerson = ({filteredPerson, persons}) => {
    if (typeof filteredPerson.id !== "undefined") {
      if(window.confirm(`Remove ${filteredPerson.name} from the phone book?`)) {
      personService.remove(filteredPerson)
      .then(response => {
        setPersons(persons.filter(person => person.name !== filteredPerson.name))
        setSuccessMessage(`${filteredPerson.name} was deleted successfully`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(`Error! ${filteredPerson.name} has already been removed from the server.`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      }
    }
    else {
      if(window.confirm(`Remove ${filteredPerson.name} from the phone book?`)) {
        setErrorMessage(`${filteredPerson.name} was not yet added to the server! Refresh the page if you wish to delete the entry`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleFilterInputChange = (event) => {
    setFilterName(event.target.value)
  }

  return (
    <div>
      <h2>Phone book</h2>

      <SuccessNotification message={successMessage}/>
      <ErrorNotification message={errorMessage}/>

      <Filter handleFilterInputChange={handleFilterInputChange}/>

      <h2>New Entry</h2>

      <PersonForm addPerson={addPerson}
                  deletePerson={deletePerson} 
                  newName={newName} 
                  handleNameInputChange={handleNameInputChange}
                  newNumber={newNumber}
                  handleNumberInputChange={handleNumberInputChange}
      />

      <h2>Numbers</h2>
      
      <Persons persons={persons}
               filterName={filterName}
               deletePerson={deletePerson}
               />
    </div>
  )
}

const Filter = (props) => {
  return (
    <p>Filter shown: <input onChange={props.handleFilterInputChange}/></p>
  )
}

const PersonForm = (props) => {
  return (
  <form onSubmit={props.addPerson}>
    <div>
      <p>Name: <input value = {props.newName} onChange = {props.handleNameInputChange}/></p>
      <p>Number: <input value = {props.newNumber} onChange = {props.handleNumberInputChange}/></p>
    </div>
    <div>
      <button type="submit">Add</button>
    </div>
  </form>
  )
}

const Persons = ({persons, filterName, deletePerson}) => {
  return (
    <div>
     {persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())).map(filteredPerson =>
       <div key = {filteredPerson.number}>
          <p>{filteredPerson.name}: {filteredPerson.number} <button onClick={()=>deletePerson({filteredPerson, persons})}>delete</button></p>
       </div> 
      )}
    </div>
  )
}

const SuccessNotification = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className="success">
      {message}
    </div>
  )
}

const ErrorNotification = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

export default App
