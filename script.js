const degree = document.querySelector(".degree");
const form = document.querySelector("form");
const cityHeader = document.querySelector(".city");
const error = document.querySelector(".error");
const input = document.querySelector("input");
const body = document.querySelector("body");
const icon = document.querySelector(".weather-icon");

async function getLondonData() {
  const response = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=London&appid=d3a8f63d8a56b6a18cb003f85d8dd883",
    { mode: "cors" }
  );
  const weatherData = await response.json();
  cityHeader.textContent = "London";
  degree.innerHTML = `${Math.round(weatherData.main.temp - 273.15)} &#8451;`;
  icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png"></img>`;
}

async function getSearchedData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d3a8f63d8a56b6a18cb003f85d8dd883`,
      { mode: "cors" }
    );
    const weatherData = await response.json();
    cityHeader.textContent = weatherData.name;
    degree.innerHTML = `${Math.round(weatherData.main.temp - 273.15)} &#8451;`;
    icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png"></img>`;
  } catch {
    error.textContent = "An error occurred. Check the city name";
  }
}

form.addEventListener("submit", (e) => {
  let keyword = document.querySelector("input").value;
  e.preventDefault();
  getSearchedData(keyword);
});

input.addEventListener("input", () => {
  error.textContent = "";
});

getLondonData();
