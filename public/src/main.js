const weatherDisplay = document.querySelector('.weather');
const weatherForm = document.querySelector('.weather-form');
const cityInput = document.querySelector('#city-input');

// Fetch weather data from API 


// Event listener for form submission - city input

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  if (cityInput.value === ''){
    alert('Please enter a city')
  }
  else{
    fetchWeather(cityInput.value)
  }
})