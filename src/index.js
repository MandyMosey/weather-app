function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours <10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes <10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday", 
    "Monday", 
    "Tuesday", 
    "Wednesday", 
    "Thursday", 
    "Friday", 
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  days.forEach(function (day){
    forecastHTML = forecastHTML +
      `
      <div class="col-2">
        <div class="forecast-date">${day}</div>
        <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="" width="60"/>
        <div class="forecast-temp">
          <span class="forecast-temp-max">50°</span>          
          <span class="forecast-temp-min">20°</span>
        </div>
      </div>
  `;
  });
  
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  fahrenheitTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "f81484afceeb8c759417d745c4c551f4"
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchBoxElement = document.querySelector("#search-box");
  search(searchBoxElement.value);
}

let apiKey = "f81484afceeb8c759417d745c4c551f4"
let city = "Boston";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemperature = (5/9) * (fahrenheitTemperature - 32);
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;



let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link")
celsiusLink.addEventListener("click", showCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link")
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

search("Boston");
displayForecast();
