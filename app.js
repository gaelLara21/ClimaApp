const apiKey = 'f151a643a88440ad0fc016d2249efa39';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';

async function request(url) {
    return fetch(url).then(response => response.json());
}

async function getWeatherByCoords(lat, lon) {
    const url = baseUrl + `lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const data = await request(url);
    updateDOM(data.main.temp, data.name);
    changeBackgroundColor(data.weather[0].main);
}

async function getWeatherByCity() {
    const city = document.getElementById("cityInput").value;
    const url = baseUrl + `q=${city}&appid=${apiKey}&units=metric`;
    const data = await request(url);

    if (data.cod === "404") {
        alert("No se encontró la ciudad. Intenta de nuevo.");
        return;
    }

    updateDOM(data.main.temp, data.name);
    changeBackgroundColor(data.weather[0].main);
}

function updateDOM(temperature, cityName) {
    document.getElementById("temperature").textContent = temperature;
    document.getElementById("cityName").textContent = cityName;
}

function changeBackgroundColor(weatherCondition) {
    const body = document.body;

    switch (weatherCondition.toLowerCase()) {
        case 'clear':
            body.style.backgroundColor = 'skyblue';
            break;
        case 'clouds':
            body.style.backgroundColor = 'lightgray';
            break;
        case 'rain':
            body.style.backgroundColor = 'blue';
            break;
        default:
            body.style.backgroundColor = 'white';
            break;
    }
}

navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeatherByCoords(lat, lon);
});
