const weatherDisplay = document.querySelector('.weather');
const weatherForm = document.querySelector('#weather-form');
const cityInput = document.querySelector('#city-input');
const card = document.querySelector('.card');
const submitBtn = document.getElementById('submitBtn');
const container = document.querySelector('.container');
const sideNav = document.querySelector('aside');

// FetchAPI  weather data from OpenWeather API 
const fetchWeather = async (city) => {
  
  const url= `/api?q=${city}`

  const res = await fetch(url)
  const data = await res.json()

  if (data.cod === '404' ){
    alert('City not found')
    return
  }

  if (data.cod === 401) {
    alert ('Invalid API Key')
    return
  }

 // Check out the object in console
 console.log(data);

 // destructing the object
 const displayData = {
   city: data.name,
   temp: kelvinToFahrenheit(data.main.temp),
   feelLike: kelvinToFahrenheit(data.main.feels_like),
   humidity: data.main.humidity
 }

 // Send gathered information to DOM
 addWeatherToDOM(displayData)
}

// To Convert Kelvin to Fahrenheit

const kelvinToFahrenheit = (temp) => {
  return Math.ceil(((temp - 273.15) *9) / 5 +32)
}



// To add display data to DOM
const addWeatherToDOM = (data) => {
  container.style.height = 80 + 'vh';
  container.style.width = 100 + '%';
  card.style.opacity = 1;
  sideNav.classList.remove('hide');
  weatherDisplay.innerHTML = `
  <h1>Current Weather in ${data.city}</h1>
  <h2>${Date()}</h2>
  <h2>${data.temp} &deg;F</h2>
  <h2>Real feel of ${data.feelLike} &deg;F</h2>
  <h2>Humidity: ${data.humidity} %</h2>`

  // Clear out input field
  cityInput.value = ''
}


// Event listener for form submission - city input

  submitBtn.addEventListener('click', function (e) {
    // Add ripple effect to button
    const x = e.clientX;
    const y = e.clientY;
    console.log(x,y);
  
    const buttonTop = e.target.offsetTop;
    const buttonLeft = e.target.offsetLeft;
    const xInside = x - buttonLeft;
    const yInside = y - buttonTop;
  
    console.log(xInside, yInside);
  
    const circle = document.createElement('span')
    circle.classList.add('circle');
    circle.style.top = yInside + 'px';
    circle.style.left = xInside + 'px';
  
    this.appendChild(circle);

    setTimeout(() => circle.remove(), 500);
   });

  weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  if (cityInput.value === ''){
    alert('Opps! Please enter a city')
  }
  else{
    submitBtn.innerHTML ="Change Location";
    fetchWeather(cityInput.value)
  }
})

