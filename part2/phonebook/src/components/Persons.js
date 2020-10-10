import React from 'react'
import Number from './Number'

const Persons = ({ personsToShow, handleDelete }) => {
    return (
        <>
            {personsToShow.map(person =>
                <div key={person.id}>
                    <Number name={person.name} number={person.number} />
                    <button onClick={() => handleDelete(person)}>Delete</button>
                </div>
                )}
        </>
    )
}

export default Persons