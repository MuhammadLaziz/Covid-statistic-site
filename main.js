const form = document.querySelector('form')
const input = document.querySelector('input')
const flags = document.querySelector('.flags')
const countryName = document.querySelector('.country-name')
const confirmed = document.querySelector('.confirmed')
const death = document.querySelector('.death')
const recovered = document.querySelector('.recovered')
const active = document.querySelector('.active')

form.addEventListener('click', getCountry)

function getCountry(e) {
  e.preventDefault()
  const nameSearch = input.value
  showResult(nameSearch) // davlat nomini unversal functionga uzatadi
}

// ixtiyoriy davlat aniqlovchi
function randomCountryFc() {
  const countriesApi = 'https://restcountries.eu/rest/v2/all'

  fetch(countriesApi)
    .then(function (data) {
      return data.json()
    })
    .then(getCountry)

  function getCountry(info) {
    const randomCountry = Math.floor(Math.random() * 250)
    showResult(info[randomCountry].name) // davlat nomini unversal functionga uzatadi
  }
}

randomCountryFc()

// unversal faqat davlat nomi kelsa o'sha davlat nomi bo'yicha qidruv beradi key= davalt nomi
function showResult(key) {
  const covidApi = `https://api.covid19api.com/live/country/${key}/status/confirmed`
  fetch(covidApi)
    .then(function (data) {
      return data.json()
    })
    .then(getResult)

  function getResult(info) {
    const lastInfo = info[info.length - 1]
    console.log(lastInfo)
    const flagApi = `https://www.countryflags.io/${lastInfo.CountryCode}/flat/64.png`
    flags.src = `${flagApi}`

    countryName.textContent = lastInfo.Country
    confirmed.textContent = lastInfo.Confirmed
    death.textContent = lastInfo.Deaths
    recovered.textContent = lastInfo.Recovered
    active.textContent = lastInfo.Active
  }
}

// randomCountryFc()

/* 

1) inputdan ma'lumotni olib asosiy api bor functionga davlat nomini bervorish

2) radnom davlat nomini olib asosiy api bor functionga davlat nomini bervorish

3) asosiy api bor funciton da API, Fetch => faqat davlat nomi kerak bo'ladi holos

*/
