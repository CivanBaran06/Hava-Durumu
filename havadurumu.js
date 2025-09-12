const weatherConditions = [
    "Güneşli ☀️",
    "Bulutlu ☁️",
    "Yağmurlu 🌧️",
    "Kar Yağışlı ❄️",
    "Rüzgarlı 🌬️",
    "Fırtınalı ⛈️",
    "Sisli 🌫️"
];

const cityInput = document.getElementById("cityInput");
const checkWeatherBtn = document.getElementById("checkWeatherBtn");
const weatherDisplay = document.getElementById("weatherDisplay");

function showRandomWeather() {
    const city = cityInput.value.trim();
    if(city === "") {
        alert("Lütfen bir şehir girin!");
        return;
    }

    const randomIndex = Math.floor(Math.random() * weatherConditions.length);
    const weather = weatherConditions[randomIndex];

    weatherDisplay.textContent = `${city} için hava durumu: ${weather}`;
}

// Butona tıklandığında çalışacak
checkWeatherBtn.addEventListener("click", showRandomWeather);
