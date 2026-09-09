// Open-Meteo API coordinates
// Charlotte, North Carolina
const latitude = 35.2271;
const longitude = -80.8431;


// Page elements
const temperatureButton = document.getElementById("temperature-button");
const conditionsButton = document.getElementById("conditions-button");

const resultTitle = document.getElementById("result-title");
const weatherData = document.getElementById("weather-data");

const loadingMessage = document.getElementById("loading-message");
const errorMessage = document.getElementById("error-message");


// Show the loading message
function showLoading() {
    loadingMessage.classList.remove("hidden");
    errorMessage.classList.add("hidden");
    weatherData.innerHTML = "";
}


// Hide the loading message
function hideLoading() {
    loadingMessage.classList.add("hidden");
}


// Display an error message
function showError(message) {
    hideLoading();

    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
}


// Convert Open-Meteo weather codes into readable descriptions
function getWeatherDescription(weatherCode) {

    const weatherDescriptions = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing rime fog",
        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",
        61: "Slight rain",
        63: "Moderate rain",
        65: "Heavy rain",
        71: "Slight snow",
        73: "Moderate snow",
        75: "Heavy snow",
        80: "Slight rain showers",
        81: "Moderate rain showers",
        82: "Violent rain showers",
        95: "Thunderstorm",
        96: "Thunderstorm with slight hail",
        99: "Thunderstorm with heavy hail"
    };

    return weatherDescriptions[weatherCode] || "Unknown weather condition";
}


// Get temperature information
async function getTemperature() {

    showLoading();

    resultTitle.textContent = "Temperature";

    /*
     * This GET request asks the API only for
     * temperature information.
     */
    const temperatureUrl =
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`;

    try {

        const response = await fetch(temperatureUrl);

        if (!response.ok) {
            throw new Error("Unable to retrieve temperature data.");
        }

        const data = await response.json();

        const temperature = data.current.temperature_2m;
        const unit = data.current_units.temperature_2m;

        hideLoading();

        weatherData.innerHTML = `
            <div class="weather-card">
                <h3>Current Temperature</h3>
                <p class="weather-value">
                    ${temperature} ${unit}
                </p>
                <p>
                    Location: Charlotte, North Carolina
                </p>
            </div>
        `;

    } catch (error) {

        showError(
            "Sorry, the temperature information could not be loaded. Please try again."
        );

        console.error(error);
    }
}


// Get weather condition information
async function getConditions() {

    showLoading();

    resultTitle.textContent = "Weather Conditions";

    /*
     * This is a separate GET request.
     * It asks the API only for weather condition information.
     */
    const conditionsUrl =
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weather_code`;

    try {

        const response = await fetch(conditionsUrl);

        if (!response.ok) {
            throw new Error("Unable to retrieve weather condition data.");
        }

        const data = await response.json();

        const weatherCode = data.current.weather_code;
        const description = getWeatherDescription(weatherCode);

        hideLoading();

        weatherData.innerHTML = `
            <div class="weather-card">
                <h3>Current Weather Condition</h3>
                <p class="weather-value">
                    ${description}
                </p>
                <p>
                    Weather code: ${weatherCode}
                </p>
                <p>
                    Location: Charlotte, North Carolina
                </p>
            </div>
        `;

    } catch (error) {

        showError(
            "Sorry, the weather condition information could not be loaded. Please try again."
        );

        console.error(error);
    }
}


// Navigation event listeners

temperatureButton.addEventListener("click", getTemperature);

conditionsButton.addEventListener("click", getConditions);
