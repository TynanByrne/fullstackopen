import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personsService from './services/personsService'
import Message from './components/Message'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterTerm, setFilterTerm] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState({ text: null, type: "" })

  useEffect(() => {
    personsService
      .getAllPersons()
      .then(res => {
        console.log('promise fulfilled')
        setPersons(res)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const updatePerson = (person) => {
    const id = persons.find(p => p.name === person.name).id
    let updatedPerson = { ...person }
    updatedPerson.id = id
    personsService
      .updatePerson(updatedPerson)
      .then(res => {
        setPersons(persons.map(p => p.id === res.id ? res : p))
        setMessage({ text: `Updated ${res.name}'s phone number`, type: "success" })
        setTimeout(() => {
          setMessage({ text: null, type: "" })
        }, 3000)
        return res
      })
      .catch(error => {
        console.log(error.response)
        if (error.response.data.error.errors.number.name === 'ValidatorError') {
          setMessage({ text: `${error.response.data.error.message}`, type: "error" })
          setTimeout(() => {
            setMessage({ text: null, type: "" })
          }, 3000)
        } else {
          setMessage({ text: `${updatedPerson.name} has already been removed from the server`, type: "error" })
          setPersons(persons.filter(p => p.id !== id))
          setTimeout(() => {
            setMessage({ text: null, type: "" })
          }, 3000)
        }
      })
  }


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName, number: newNumber
    }
    if ((persons.filter((person) => person.name === personObject.name)).length !== 0) {
      if (window.confirm(`${personObject.name} is already added to the phonebook. Replace the old number with a new one?`)) {
        updatePerson(personObject)
      }
    } else {
      personsService
        .createPerson(personObject)
        .then(res => {
          setPersons(persons.concat(res))
          setMessage(`Added ${res.name}'s phone number to the phonebook`, "success")
          setTimeout(() => {
            setMessage({ text: null, type: "" })
          }, 3000)
        })
        .catch(error => {
          console.log(error.response)
          setMessage({ text: `${error.response.data.error.message}`, type: "error" })
          setTimeout(() => {
            setMessage({ text: null, type: "" })
          }, 3000)
        })
    }
    setNewName('')
    setNewNumber('')
  }


  const personDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .deletePerson(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          setMessage({ text: `Deleted ${person.name} from the phonebook`, type: "success" })
          setTimeout(() => {
            setMessage({ text: null, type: "" })
          }, 3000)
        })

    }
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
      <Message message={message} />
      <Header header="Numbers" />
      <Persons personsToShow={personsToShow} handleDelete={personDelete} />
    </div>
  )
}

export default App