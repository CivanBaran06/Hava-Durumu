// OpenWeatherMap API ayarları
const API_KEY = "125de7a7011df63065ff831ea91137b9"
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const result = document.getElementById("result");

// Hava durumu bilgisini çek
async function fetchWeather(city) {
  try {
    result.innerHTML = "<p>Yükleniyor...</p>";

    const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=tr`;
    const res = await fetch(url);

    if (!res.ok) {
      if (res.status === 404) throw new Error("Şehir bulunamadı!");
      throw new Error("Veri alınamadı.");
    }

    const data = await res.json();
    showWeather(data);

  } catch (err) {
    result.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
}

// Hava durumunu ekranda göster
function showWeather(data) {
  const { name, sys, main, weather, wind } = data;
  const description = weather[0].description;
  const icon = weather[0].icon;

  result.innerHTML = `
    <div class="weather-card">
      <h2>${name}, ${sys.country}</h2>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
      <p><strong>${Math.round(main.temp)}°C</strong> - ${description}</p>

      <div class="weather-details">
        <div>
          <p>💧 Nem</p>
          <p>${main.humidity}%</p>
        </div>
        <div>
          <p>🌬 Rüzgar</p>
          <p>${wind.speed} m/s</p>
        </div>
        <div>
          <p>📊 Basınç</p>
          <p>${main.pressure} hPa</p>
        </div>
      </div>
    </div>
  `;
}

// Olay dinleyiciler
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchBtn.click();
});
