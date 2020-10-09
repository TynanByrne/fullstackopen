import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SingleCountry = ({ country }) => {
    const api_key = process.env.REACT_APP_WEATHERSTACK_KEY
    const [ currentWeather, setCurrentWeather ] = useState(null)
    useEffect(() => {
        (country) ?
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
            .then(res => {
                console.log('promise fulfilled')
                setCurrentWeather(res.data.current)
            }) : console.log("Country wasn't defined.")
    }, [api_key, country])

    if (!country || !currentWeather) {
        return (
            <></>
        )
    } else {
        return (
            <>
                <h1>{country.name}</h1>
                <div>capital {country.capital}</div>
                <div>population {country.population}</div>
                <h3>Languages</h3>
                <ul>
                    {country.languages.map(language =>
                        <li key={language.name}>{language.name}</li>
                    )}
                </ul>
                <img src={country.flag} alt={`${country.name}'s flag`} />
                <h3>Weather in {country.capital}</h3>
                <div><b>temperature:</b> {currentWeather.temperature} °C</div>
                <img src={currentWeather.weather_icons} alt={`weather icons for ${country.capital}`} />
                <div><b>wind:</b> {currentWeather.wind_speed} mph, directed {currentWeather.wind_dir}</div>
            </>
        )
    }
}

export default SingleCountry