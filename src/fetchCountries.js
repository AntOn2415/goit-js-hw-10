const BASE_URL = `https://restcountries.com/v3.1`

function fetchCountries(country) {
  return fetch(`${BASE_URL}/name/${country}`).then(response => {
    return response.json();
  })
}

export {fetchCountries};