var inputDiv = document.querySelector(".search input");
var searchBtn = document.querySelector(".search img");
var weatherImg = document.querySelector("#container>img");
var tempDiv = document.querySelector("#temp");
var locDiv = document.querySelector("#loc");
var humidityValDiv = document.querySelector("#humidityVal");
var windSpeedValDiv = document.querySelector("#windSpeedVal");
var cardDiv = document.querySelector("#card");
var containerDiv = document.querySelector("#container");
var loaderDiv = document.querySelector("#loader");
var errorDiv = document.querySelector("#error");

async function getWeatherData(city) {
    loaderDiv.style.display = "flex";
    const weatherApiData = await fetch(BASE_URL + city + `&appid=${API_KEY}`);
    const weatherData = await weatherApiData.json();
    // console.log(weatherApiData.status);
    loaderDiv.style.display = "none";
    if(weatherApiData.status == 404){
        errorDiv.style.display = "block";
    containerDiv.style.display = "none";
    }
    else{
locDiv.innerText = weatherData.name;
    tempDiv.innerText = `${weatherData.main.temp}°c`;       //interpolation
    humidityValDiv.innerText = weatherData.main.humidity + "%";       //concatenation
    windSpeedValDiv.innerText = weatherData.wind.speed;
    if (weatherData.weather[0].main == "Clouds") {
        weatherImg.src = "images/clouds.png";
    } else if (weatherData.weather[0].main == "Clear") {
        weatherImg.src = "images/clear.png";
    }
    else if (weatherData.weather[0].main == "Rain") {
        weatherImg.src = "images/rain.png";
    }
    else if (weatherData.weather[0].main == "Mist") {
        weatherImg.src = "images/mist.png";
    }
    else if (weatherData.weather[0].main == "Snow") {
        weatherImg.src = "images/snow.png";
    }
    else if (weatherData.weather[0].main == "Humidity") {
        weatherImg.src = "images/humidity.png";
    }
    else if (weatherData.weather[0].main == "Wind") {
        weatherImg.src = "images/wind.png";
    }
    else if (weatherData.weather[0].main == "Drizzle") {
        weatherImg.src = "images/drizzle.png";
    }
    // cardDiv.style.height = "80%";
    containerDiv.style.display = "flex";

    errorDiv.style.display = "none";
    }
    // console.log(weatherData);
    // console.log(weatherData.main.temp, " temp");
    // console.log(weatherData.weather[0].main, " coludes or not ?");
    // console.log(weatherData.wind.speed, " wind speed");
    // console.log(weatherData.main.humidity, " humidity");
}

searchBtn.addEventListener("click", function (elem) {
    getWeatherData(inputDiv.value);
});

inputDiv.addEventListener("keyup", function (elem) {
    if (elem.key === 'Enter') {
        getWeatherData(inputDiv.value);
        inputDiv.focus();
    }
});