document.getElementById("searchBtn").addEventListener("click", getWeather);
document.getElementById("cityInput").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        getWeather();
    }
});

function getWeather(){
    const city = document.getElementById("cityInput").value.trim();
    const apiKey = "1cf3bc97e1d47e94d9ff80b8748f788b";
    const weatherInfo = document.getElementById("weatherInfo");
    const errorMsg = document.getElementById("errorMsg");

    if(city === ""){
        errorMsg.textContent = "Please enter a city name.";
        weatherInfo.innerHTML = "";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(response => {
        if(!response.ok){
            throw new Error("City not found");
        }
        return response.json();
    })
    .then(data => {
        errorMsg.textContent = "";
        const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="${icon}" class="weather-icon" alt="Weather Icon">
        <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
        <p>🌡️ Temperature: ${data.main.temp}°C</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
      `;
    })
    
    .catch(error => {
        errorMsg.textContent = error.message;
        weatherInfo.innerHTML = "";
    });
}