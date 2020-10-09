import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterTerm, setFilterTerm ] = useState('')
  const [ showAll, setShowAll ] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        console.log('promise fulfilled')
        setPersons(res.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName, number: newNumber
    }
    if ((persons.filter((person) => person.name === personObject.name)).length !== 0 ) {
      window.alert(`${personObject.name} is already added to the phonebook.`)
    } else {
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = showAll ?  // If showAll is true
    persons // Show persons as is
    : persons.filter((person) => 
      person.name.toUpperCase().includes(filterTerm.toUpperCase())
      ) // Else, filter out the ones we want

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFilterChange = (event) => {
    if (event.target.value === '') {
      setShowAll(true)
    } else {
      setShowAll(false)
    }
    setFilterTerm(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <Header header="Phonebook" />
      <Filter value={filterTerm} onChange={handleFilterChange} />
      <Header header="add a new" />
      <PersonForm 
        name={newName} 
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} 
        onSubmit={addPerson}
        number={newNumber} />
      <Header header="Numbers" />
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App