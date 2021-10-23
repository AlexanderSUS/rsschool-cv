export {setWeather, changeCity, saveCity, setCity}
const city = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');
const weatherError = document.querySelector('.weather-error');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const apiKey = "fb36af34a9dbb29b6cac739987201322";
const weatherLink = "https://api.openweathermap.org/data/2.5/weather?q="
const defaultCity = 'Minsk';
const defaultLang = 'en';
const defaultWeatherLink = `${weatherLink}${defaultCity}&lang=${defaultLang}&appid=${apiKey}&units=metric`;
export {defaultWeatherLink}

const windSpeedStr = "Wind speed ";
const humidityStr = "Humidity ";

function getWeatherLink(city) {
  return `${weatherLink}${city}&lang=${defaultLang}&appid=${apiKey}&units=metric`;
}

function setCity() {
  if (localStorage.getItem('city') == undefined || localStorage.getItem('city') == "" ||
  localStorage.getItem('city') == "Wrong city") {
    city.value = defaultCity;
  } else {
    city.value = localStorage.getItem('city');
  }
}

function changeCity() {
  city.addEventListener('change', setWeather);
}

function saveCity() {
  localStorage.setItem('city', city.value);
}

async function getWeather(weatherLink) {  

  const res = await fetch(weatherLink);
  const data = await res.json(); 

  if (data.cod == "400" || data.cod == "404") {
    city.value = "Wrong city";
  } else if (data.cod == "429") {
    temperature.textContent = "Surpasing API Limit";
  } else {
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${windSpeedStr}${data.wind.speed}`;
    humidity.textContent = `${humidityStr}${data.main.humidity}`;
  }
}

function setWeather() {
  getWeather(getWeatherLink(city.value));
}