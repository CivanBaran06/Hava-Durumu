const cityInput = document.getElementById("cityInput");
const suggestions = document.getElementById("suggestions");
const weatherCard = document.getElementById("weatherCard");
const cityNameEl = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");
const temperatureEl = document.getElementById("temperature");
const descriptionEl = document.getElementById("description");
const windEl = document.getElementById("wind");
const humidityEl = document.getElementById("humidity");
const background = document.querySelector(".background");

const apiKey = "125de7a7011df63065ff831ea91137b9";

// Şehir arama ve autocomplete
cityInput.addEventListener("input", async () => {
  const query = cityInput.value.trim();
  if (!query) {
    suggestions.innerHTML = "";
    return;
  }

  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`;
  const res = await fetch(geoUrl);
  const cities = await res.json();

  suggestions.innerHTML = "";
  cities.forEach(city => {
    const div = document.createElement("div");
    div.textContent = `${city.name}, ${city.country}`;
    div.addEventListener("click", () => {
      cityInput.value = div.textContent;
      suggestions.innerHTML = "";
      getWeather(city.lat, city.lon);
    });
    suggestions.appendChild(div);
  });
});

// Hava durumu verilerini getir ve arkaplan değiştir
async function getWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.cod === 200) {
    cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    temperatureEl.textContent = `🌡️ ${data.main.temp} °C`;
    descriptionEl.textContent = `☁️ ${data.weather[0].description}`;
    windEl.textContent = `💨 Wind: ${data.wind.speed} m/s`;
    humidityEl.textContent = `💧 Humidity: ${data.main.humidity}%`;
    weatherCard.classList.remove("hidden");

    // Arkaplanı hava durumuna göre değiştir
    const weatherMain = data.weather[0].main.toLowerCase();
    switch(weatherMain) {
      case 'clear':
        background.style.background = "linear-gradient(to right, #fceabb, #f8b500)";
        break;
      case 'clouds':
        background.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
        break;
      case 'rain':
      case 'drizzle':
        background.style.background = "linear-gradient(to right, #4e54c8, #8f94fb)";
        break;
      case 'thunderstorm':
        background.style.background = "linear-gradient(to right, #0f2027, #203a43, #2c5364)";
        break;
      case 'snow':
        background.style.background = "linear-gradient(to right, #e0eafc, #cfdef3)";
        break;
      default:
        background.style.background = "linear-gradient(to right, #74ebd5, #9face6)";
    }
  }
}
