import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filterCountries, setFilterCountries ] = useState('')
  const [ isSelected, setIsSelected ] = useState(false)
  const [ selectedCountry, setSelectedCountry ] = useState({})
  const [ weather, setWeather ] = useState({})
  const [ fetchingWeatherData, setFetchingWeatherData ] = useState(false)
  const [ countryToBeSet, setCountryToBeSet ] = useState({})

  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  useEffect(() => {
    console.log(`Fetching weather data for: ${selectedCountry.capital}`)
    axios
    .get('http://api.weatherstack.com/current', {
      params: {
        access_key: api_key,
        query: selectedCountry.capital
      }
    })
    .then(response => {
      setWeather(response.data)
    })
  }, [selectedCountry])

  useEffect(() => {
    setFetchingWeatherData(false)
  }, [weather])

  useEffect(() => {
    console.log(`Selecting country: ${countryToBeSet.name}`)
    const filteredCountry = countryToBeSet
    handleCountrySelect({filteredCountry}, {setSelectedCountry}, {setIsSelected}, {setFetchingWeatherData})
  }, [countryToBeSet])

  const handleFilterInputChange = (event) => {
    setFilterCountries(event.target.value)
    
    setIsSelected(false)
  }

  return (
    <div>
      <Filter handleFilterInputChange={handleFilterInputChange}/>

      <Countries countries = {countries} 
                filterCountries = {filterCountries} 
                setIsSelected = {setIsSelected} 
                isSelected = {isSelected}
                selectedCountry = {selectedCountry}
                setSelectedCountry = {setSelectedCountry}
                weather = {weather}
                fetchingWeatherData = {fetchingWeatherData}
                setFetchingWeatherData = {setFetchingWeatherData}
                setCountryToBeSet = {setCountryToBeSet}
                />
    </div>
  )
}

const Filter = ({handleFilterInputChange}) => {
  return(
    <p>Find countries: <input onChange = {handleFilterInputChange}></input></p>
  )
}

const Countries = ({countries, 
                    filterCountries, 
                    setIsSelected, 
                    isSelected, 
                    selectedCountry, 
                    setSelectedCountry, 
                    weather, 
                    fetchingWeatherData, 
                    setFetchingWeatherData,
                    setCountryToBeSet}) => {

  const list = countries.filter(country => country.name.toLowerCase().includes(filterCountries.toLowerCase()))

  if(filterCountries === '') {
    return (
      <p></p>
    )
  }
  else if (list.length > 10 && !isSelected) {
    return (
      <p>Too many results! Please specify.</p>
    )
  }
  else if (list.length === 0) {
    return (
      <p>No such country found!</p>
    )
  }
  else if (list.length === 1 && !isSelected) {

      setCountryToBeSet(list[0])

    console.log("Selecting the following country")
    console.log(list[0])

    return (
      <>
        {list.map(selectedCountry =>
          <div key = {selectedCountry.name}>
            <h2>{selectedCountry.name}</h2>

            <p>Capital: {selectedCountry.capital}</p>
            <p>Population: {selectedCountry.population}</p>

            <h3>Languages</h3>

            <ul>
              {selectedCountry.languages.map(language =>
                <li key={language.name}>
                  {language.name}
                </li>
              )}
            </ul>

            <img src={selectedCountry.flag} alt={selectedCountry.name} width="300" height="200"/>

            <p>Fetching weather data...</p>

          </div> 
        )}
      </>
    )
  }
  else if (list.length > 1 && list.length <= 10 && !isSelected) {
    return (
      <>
        {list.map(filteredCountry =>
                    <div key = {filteredCountry.name}>
                      {filteredCountry.name + " "}<button onClick={()=>handleCountrySelect(
                                                    {filteredCountry}, {setSelectedCountry}, {setIsSelected}, {setFetchingWeatherData})}>
                                                  Show</button>
                    </div> 
        )}
      </>
    )
  }
  else if (fetchingWeatherData) {
    return (
      <>
      <div key = {selectedCountry.name}>
        <h2>{selectedCountry.name}</h2>
  
        <p>Capital: {selectedCountry.capital}</p>
        <p>Population: {selectedCountry.population}</p>
  
        <h3>Languages</h3>
  
        <ul>
          {selectedCountry.languages.map(language =>
            <li key={language.name}>
              {language.name}
            </li>
          )}
        </ul>
  
        <img src={selectedCountry.flag} alt={selectedCountry.name} width="300" height="200"/>
  
        <p>Fetching weather data...</p>
  
      </div> 
    </>
    )
  }

  return(
  <>
    <div key = {selectedCountry.name}>
      <h2>{selectedCountry.name}</h2>

      <p>Capital: {selectedCountry.capital}</p>
      <p>Population: {selectedCountry.population}</p>

      <h3>Languages</h3>

      <ul>
        {selectedCountry.languages.map(language =>
          <li key={language.name}>
            {language.name}
          </li>
        )}
      </ul>

      <img src={selectedCountry.flag} alt={selectedCountry.name} width="300" height="200"/>

      <ShowWeather weather = {weather} selectedCountry = {selectedCountry} fetchingWeatherData = {fetchingWeatherData}/>

    </div> 
  </>
  )
}

const handleCountrySelect = ({filteredCountry}, {setSelectedCountry}, {setIsSelected}, {setFetchingWeatherData}) => {
  setSelectedCountry(filteredCountry)
  setIsSelected(true)
  setFetchingWeatherData(true)
}

const ShowWeather = ({weather, selectedCountry}) => {
  return (
    <div>
      <h3>Weather in {selectedCountry.capital}</h3>
      <p><strong>Temperature:</strong> {weather.current.temperature} Celsius</p>
      <p><strong>Feels like:</strong> {weather.current.feelslike} Celsius</p>
      <img src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions} width="100" height="100"/>
      <p><strong>{weather.current.weather_descriptions}</strong></p>
      <p><strong>Wind:</strong> {weather.current.wind_speed} mph, direction {weather.current.wind_dir}</p>
    </div>
  )
}

export default App;
