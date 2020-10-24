import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook!`)
    }
    else {
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
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
      <h2>Phonebook</h2>

      <Filter handleFilterInputChange={handleFilterInputChange}/>

      <h2>New Entry</h2>

      <PersonForm addPerson={addPerson} 
                  newName={newName} 
                  handleNameInputChange={handleNameInputChange}
                  newNumber={newNumber}
                  handleNumberInputChange={handleNumberInputChange}
      />

      <h2>Numbers</h2>
      
      <Persons persons={persons}
               filterName={filterName}
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

const Persons = ({persons, filterName}) => {
  return (
    <div>
     {persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())).map(filteredPerson =>
       <div key = {filteredPerson.name}>
          <p>{filteredPerson.name}: {filteredPerson.number}</p>
       </div> 
      )}
    </div>
  )
}

export default App
