document.addEventListener('DOMContentLoaded', function () {
    const cityInput = document.getElementById("city");
    const searchButton = document.getElementById("search");
    const cityName = document.getElementById("city-name");
    const weatherIcon = document.getElementById("weather-icon");
    const description = document.getElementById("description");
    const temperature = document.getElementById("temperature");

    searchButton.addEventListener('click', function () {
        const city = cityInput.value;
        if (city) {
            fetchWeather(city);
        }
    });

    function fetchWeather(city) {
        // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
        const apiKey = '313c0e03f18998f771d3522d786b8fd3';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                cityName.textContent = data.name;
                description.textContent = data.weather[0].description;
                temperature.textContent = data.main.temp + "°C";
                weatherIcon.innerHTML = getWeatherIcon(data.weather[0].icon);
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                cityName.textContent = "City not found";
                description.textContent = "";
                temperature.textContent = "";
                weatherIcon.innerHTML = "";
            });
    }

    function getWeatherIcon(iconCode) {
        return `<i class="wi wi-owm-${iconCode}"></i>`;
    }
});
