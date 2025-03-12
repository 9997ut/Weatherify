const searchBar = document.getElementById('searchbar');
const button = document.getElementById('fetch');
const weatherDescription = document.querySelector('.weatherdescription');
const loadingMessage = document.getElementById('loading');
const spinner = document.getElementById('spinner');
const locationButton = document.getElementById('location');

const apiKey = 'f8da44eb9e612d1ec70d64971e88acd0';

function fetchWeather() {
    const city = searchBar.value.trim();

    if (city === '') {
        alert('Please enter a valid city name!');
        return;
    }

    weatherDescription.innerHTML = '';
    loadingMessage.style.display = 'block';
    spinner.style.display = 'block';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found or API error!");
            }
            return response.json();
        })
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            spinner.style.display = 'none';
            loadingMessage.style.display = 'none';
            weatherDescription.innerHTML = `<span style="color: red;">❌ City not found or API error. Please try again!</span>`;
        });
}

function fetchWeatherByLocation(lat, lon) {
    weatherDescription.innerHTML = '';
    loadingMessage.style.display = 'block';
    spinner.style.display = 'block';

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found or API error!");
            }
            return response.json();
        })
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            spinner.style.display = 'none';
            loadingMessage.style.display = 'none';
            weatherDescription.innerHTML = `<span style="color: red;">❌ City not found or API error. Please try again!</span>`;
        });
}

function displayWeatherData(data) {
    spinner.style.display = 'none';
    loadingMessage.style.display = 'none';

    const iconCode = data.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherDescription.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="${iconURL}" alt="Weather Icon" class="weather-icon">
        <div class="weather-grid">
            <span>🌡️ Temperature (℃): ${data.main.temp}</span>
            <span>💧 Humidity: ${data.main.humidity}%</span>
            <span>☁️ Weather: ${data.weather[0].description}</span>
            <span>🌬️ Wind Speed (KMPH): ${data.wind.speed}</span>
            <span>⚡ Air Pressure: ${data.main.pressure} hPa</span>
            <span>🤔 Feels Like: ${data.main.feels_like}℃</span>
        </div>
    `;
}

button.addEventListener('click', fetchWeather);

searchBar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        fetchWeather();
    }
});

locationButton.addEventListener('click', () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            fetchWeatherByLocation(position.coords.latitude, position.coords.longitude);
        }, error => {
            alert("Geolocation failed: " + error.message);
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});
