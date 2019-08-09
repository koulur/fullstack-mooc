import React, { useState, useEffect } from 'react';
import axios from 'axios'


const Input = ({ countryName, handleNameChange}) => {
  return (
    <div>
      name: <input value={countryName} onChange={handleNameChange} />
    </div>
  )
}

const Country = ({ country }) => {
  return (
    <div>
      <h3>
          {country.name}
        </h3>
        capital: {country.capital} 
        <br/>
        population: {country.population}
        <br/>
        <h3>
          languages:
        </h3>
        <ul>
        {country.languages.map((language) => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={country.flag} alt="Country flag" style={ {width: '150px', height: '150px'}}/>
    </div>
  )
}

function App() {
  const [countryName, setCountryName] = useState('')
  const [countries, setCountries] = useState([])
  const [showCountry, setShowCountry] = useState('')

  useEffect( () => {
  axios
      .get(`https://restcountries.eu/rest/v2/name/${countryName}`)
      .then((response) => {
          setCountries(response.data)
      })
      .catch((e) => {
        setCountries([])
      })
  
  }, [countryName])

  const handleNameChange = (e) => {
    setCountryName(e.target.value)
  }

  const handleShowCountry = (countryName) => () => {
      setShowCountry(countryName)
  }

  
  if(countries.length === 1){
    return (
      <div>
        <Input countryName={countryName} handleNameChange={handleNameChange} />
        <Country country={countries[0]} />
      </div>
    )
  }

  if(countries.length === 0){
    return (
      <div>
        <Input countryName={countryName} handleNameChange={handleNameChange} />
        No countries found matching input string.
      </div>
    )
  }

  if(countries.length > 1 && countries.length < 10) {
    return (
      <div>
        <Input countryName={countryName} handleNameChange={handleNameChange} />
        {countries.map((country) => (
            <div>
              <p key={country.name}>{country.name}</p>
              <button id={country.name} onClick={handleShowCountry(country.name)}>show</button>
              {showCountry===country.name && <Country country={country}/> }
            </div>
            )
          )
        }
      </div>
    )
  }

  return (
    <div>
      <Input countryName={countryName} handleNameChange={handleNameChange} />
      {countries.map((country) => <p key={country.name}>{country.name + `\n`}</p>)}
    </div>
  );
}

export default App;
