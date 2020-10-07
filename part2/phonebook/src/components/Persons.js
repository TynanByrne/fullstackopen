import React from 'react'
import Number from './Number'

const Persons = ({ personsToShow }) => {
    return (
        <>
            {personsToShow.map(person =>
                <Number key={person.name} name={person.name} number={person.number} />
                )}
        </>
    )
}

export default Persons