const searchBar= document.getElementById('searchbar');
const button= document.getElementById('fetch');
const weatherDescription =document.getElementById('weatherdescription');
const loadingMessage = document.getElementById('loading');
const spinner = document.getElementById('spinner');
const locationButton = document.getElementById('location');

const apiKey = 'f8da44eb9e612d1ec70d64971e88acd0';


function fetchWeather (){
    const city = searchBar.value.trim();

    if(city ===''){
        alert('Please , enter a valid city name!');
        return;
    }

    weatherDescription.innerHTML ='';
    loadingMessage.style.display='none';
    spinner.style.display = 'block';
    

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response =>{
            if(!response.ok){
                throw new Error("city not found or API error!");
            }
            return response.json();
        })
        .then(data =>{
            displayWeatherData(data);
        })
        .catch(error =>{
            spinner.style.display='none';
            console.log("Error : ", error);
            weatherDescription.ATTRIBUTE_NODE.innerHTML=`
            <span>City not found or API error . Please, try again!</span>`;
        });
}

function fetchWeatherByLocation(lat, lon){
    weatherDescription.innerHTML='none';
    spinner.style.display ='block';

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)

        .then(response =>{
            if(!response.ok){
                throw new Error("City not found or API error!");

            }
            return response.json();
        })
        .then(data=>{
            displayWeatherData(data);
        })
        .catch(error=>{
            spinner.style.display='none';
            w console.log("Error : ", error);
            weatherDescription.ATTRIBUTE_NODE.innerHTML=`
            <span>City not found or API error . Please, try again!</span>`;
        });

} 
function displayWeatherData(data){
    spinner.style.display='none';
    
    const iconCode = data.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const sunriseTime = new Date (data.sys.sunrise *1000 ).toLocaleTimeString();
    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();

    weatherDescription.innerHTML=`
    
    <h2>Weather Details</h2>
    <img src="${iconURL}" alt="Weather Icon" class="weather-icon">
    <h2>${data.name},${data.sys.country}</h2>

    <div class = "weather-grid">
        <span>Temperature (℃): ${data.main.temp}</span>
        <span>🤔 Feels Like: ${data.main.feels_like}℃</span>
        <span>☁️ Weather: ${data.weather[0].description}</span>
        <span>💧 Humidity: ${data.main.humidity}%</span>
        <span>🌬️ Wind Speed: ${data.wind.speed} km/h</span>
        <span>⚡ Pressure: ${data.main.pressure} hPa</span>
        <span>👁️ Visibility: ${(data.visibility / 1000).toFixed(2)} km</span>
        <span>🌅 Sunrise: ${sunriseTime}</span>
        <span>🌇 Sunset: ${sunsetTime}</span>
    </div>    
    
    `;
    
}  
button.addEventListener('click',fetchWeather);

searchBar.addEventListener('keydown',(event)=>{
    if(event.key ==='Enter'){
        fetchWeather();
    }
});

locationButton.addEventListener('click ',()=>{
    if("geolocation" in navigatior){
        navigator.geolocation.getCurrentPosition(
            (postiton)=>{
                const lat = position.coords.latitude;
                const lon= postiton.coords.longitude;
                fetchWeatherByLocation(lat,lon);

            },
            (error)=>{
                alert("Geolocation failed: " + error.message);

            }

        );

    }
    else {
        alert("Geolocation is not supported by your browser.");
    }
});