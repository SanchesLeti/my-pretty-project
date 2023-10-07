//Form-search

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function search(event) {
  event.preventDefault();

  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");

  cityElement.innerHTML = cityInput.value;
}

// Current date & time

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//Api display

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) { 
    forecastHTML =
      forecastHTML +
      `
        <div class="col">
          <div class="date-prediction">${formatDay(forecastDay.dt)}</div>
          <br />
          <div class="img-prediction">
            <img
              src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon
      }@2x.png"
              alt=""
              width="42"
            />
          </div>
          <br />
          <div class="temp-prediction">
            <span class="max-prediction">${Math.round(forecastDay.temp.max)}°</span>
            <span class="min-prediction">${Math.round(forecastDay.temp.min)}°</span>
          </div>
        </div>
  `;
  }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function getForescast(coordinates) {
  console.log(coordinates);

  let apiKey = "88724523008dc9e1be18f6eb6a959b67";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let conditionElement = document.querySelector("#condition");
  conditionElement.innerHTML = response.data.weather[0].description;

  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemp = response.data.main.temp;
  getForescast(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let apiKey = "88724523008dc9e1be18f6eb6a959b67";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

// Celsius to Fahrenheit

function showFahreTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");

  celciusLink.classList.remove("active");
  fahreLink.classList.add("active");
  let farheTemp = (celsiusTemp * 9) / 5 + 32;

  tempElement.innerHTML = Math.round(farheTemp);
}

function showCelciusTemp(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahreLink.classList.remove("active");
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let fahreLink = document.querySelector("#fahre-link");
fahreLink.addEventListener("click", showFahreTemp);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelciusTemp);

