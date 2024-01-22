const apiKey = 'f151a643a88440ad0fc016d2249efa39';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';

async function request(url) {
    return fetch(url).then(response => response.json());
}

async function getWeatherByCoords(lat, lon) {
    const url = baseUrl + `lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const data = await request(url);
    updateDOM(data.main.temp, data.name);
}

async function getWeatherByCity() {
    const city = document.getElementById("cityInput").value;
    const url = baseUrl + `q=${city}&appid=${apiKey}&units=metric`;
    const data = await request(url);

    if (data.cod === "404") {
        alert("No se encontro la ciudad. Intenta de nuevo.");
        return;
    }
    
    updateDOM(data.main.temp, data.name);
}

function updateDOM(temperature, cityName) {
    document.getElementById("temperature").textContent = temperature;
    document.getElementById("cityName").textContent = cityName;
}

navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeatherByCoords(lat, lon);
});
