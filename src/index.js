// import debounce from "lodash.debounce";
import {fetchCountries} from "./fetchCountries";
import './css/styles.css';
const DEBOUNCE_DELAY = 300;

// NAME
// Search by country name. If you want to get an exact match, use the next endpoint. It can be the common or official value
// https://restcountries.com/v3.1/name/{name}
// https://restcountries.com/v3.1/name/eesti
// https://restcountries.com/v3.1/name/deutschland

// FILTER RESPONSE
// You can filter the output of your request to include only the specified fields.
// https://restcountries.com/v3.1/{service}?fields={field},{field},{field}
// https://restcountries.com/v3.1/all?fields=name,capital,currencies

  const searchBox = document.querySelector("#search-box");
  const countryListRef = document.querySelector(".country-list");
  const countryInfoRef = document.querySelector(".country-info");

  searchBox.addEventListener('input', onSearch);

function onSearch(e) {
  const country = e.target.value;
console.log(`i`, e.target.value);
  fetchCountries(country)
  .then(country => {
    console.log(country)
  })
  .catch(error => {
    console.error();
  })
};

function createCountryListMarkup() {
  return galleryItems
    .map(({ flag, name }) => {
      return `<li class="country-list__item"></li>`;
    })
    .join("");
}

function createCountryInfoMarkup() {
  return galleryItems
    .map(({ flag, name, capital, population, languages }) => {
      return `<div>
      <img src="{{flag}}" alt="{{name.common}}">
    </div>
    <div class="card-body">
      <h2 class="card-title">{{name.common}}</h2>
      <p>Capital: {{capital}}</p>
      <p>population: {{population}}</p>
      <p>languages: {{languages}}</p>
    </div>`;
    })
    .join("");
}

function renderCountryList(country) {
  const markup = createCountryListMarkup();
  countryListRef.innerHTML = markup;
};

function renderCountryInfo(country) {
  const markup = createCountryInfoMarkup();
  countryInfoRef.innerHTML = markup;
};
