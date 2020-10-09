import React, { useState } from 'react'
import SingleCountry from './SingleCountry'



const Countries = ({ countriesToShow, setFilterTerm }) => {
    const [clickedCountries, setClickedCountries] = useState([])

    const handleClick = (country) => {
        setClickedCountries(clickedCountries.concat(country))
        /* setFilterTerm(country.name) */ // This way uses the search bar to 'autocomplete' on click and thus only show one country
    }
    return (

        (countriesToShow.length > 10) ?
            <div>Too many countries to show</div> :
            (countriesToShow.length === 1) ?
                <div>
                    <SingleCountry country={countriesToShow[0]} />
                </div> :
                <div>
                    {countriesToShow.map(country =>
                        <div key={country.name}>
                            <div>{country.name}</div>
                            <button onClick={() => handleClick(country)}>show</button>
                            <SingleCountry key={country.name} country={clickedCountries.find(x => x === country)} />
                        </div>
                    )}
                </div>
    )
}

export default Countries