import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [showCountries, setShowCountries] = useState(false)
  const [filterTerm, setFilterTerm] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        console.log('promise fulfilled')
        setCountries(res.data)
      })
  }, [])

  const handleInputChange = (event) => {
    event.target.value === '' ?
      setShowCountries(false) : setShowCountries(true)
    setFilterTerm(event.target.value)
  }

  const countriesToShow = showCountries ?
    countries.filter((country) =>
      country.name.toUpperCase().includes(filterTerm.toUpperCase())
    ) : []

  return (
    <div>
      <h1>Find a country</h1>
      <Filter value={filterTerm} onChange={handleInputChange} />
      <Countries countriesToShow={countriesToShow} setFilterTerm={setFilterTerm} />
    </div>

  )

}

export default App;
