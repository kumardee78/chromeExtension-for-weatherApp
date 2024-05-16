const searchBtn = document.querySelector("#searchbtn")
const weatherDetail = document.querySelector(".weatherDetail")
const city = document.querySelector("#cityInput").value

const apiKey = "f260d8dd75ad55bc6f3013a0b4d0d5ed";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

searchBtn.addEventListener("click", getWeather)

async function getWeather(){
    const city = document.querySelector("#cityInput").value
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)
    console.log(response)
    if (response.status == 404) {
        // If city name is not entered
        document.querySelector(".error").style.display = "block";
        weatherDetail.style.display = "none";
    }
    else{
        const result = await response.json();
        console.log(result)
        showWeatherData(result);
    }
} 

function showWeatherData(result){
    weatherDetail.innerHTML = "";

    const image = document.createElement("img")
    image.classList.add("weather-icon")
    
    const descript = document.createElement("p")
    descript.classList.add("desc")
    descript.innerHTML = result.weather[0].description;

    const temperature = document.createElement("h2")
    temperature.classList.add("temp") 

    const cityName = document.createElement("h1")
    cityName.classList.add("city-name")
    cityName.innerHTML = result.name

    const lowerDiv = document.createElement("div")
    lowerDiv.classList.add("lowerDiv")

    const leftSide = document.createElement("div")
    leftSide.classList.add("leftDiv")

    const humidImage = document.createElement("img")
    humidImage.src = "weather-app-img/images/humidity.png"

    const humidDetailDiv= document.createElement("div")
    const humidparaOne = document.createElement("p")
    humidparaOne.classList.add("humidity")

    const humidparaTwo = document.createElement("p")
    humidparaTwo.innerHTML = "Humidity"

    humidDetailDiv.append(humidparaOne, humidparaTwo)
    leftSide.append(humidImage, humidDetailDiv)


    const rightSide = document.createElement("div")
    rightSide.classList.add("rightDiv")

    const windImage = document.createElement("img")
    windImage.src = "weather-app-img/images/wind.png"

    const windDetailDiv= document.createElement("div")
    const windparaOne = document.createElement("p")
    windparaOne.classList.add("wind")

    const windparaTwo = document.createElement("p")
    windparaTwo.innerHTML = "wind Speed"

    windDetailDiv.append(windparaOne, windparaTwo)
    rightSide.append(windImage, windDetailDiv)

    lowerDiv.append(leftSide, rightSide)
    weatherDetail.append(image,descript, temperature, cityName, lowerDiv);
    
    temperature.innerHTML = Math.round(result.main.temp) + " °C"
    humidparaOne.innerHTML = result.main.humidity + " %"
    windparaOne.innerHTML = result.wind.speed + " km/h"

    
    if(result.weather[0].main == "Clouds"){
        image.src = "weather-app-img/images/clouds.png"
    }
    else if(result.weather[0].main == "Clear"){
        image.src = "weather-app-img/images/clear.png"
    }
    else if(result.weather[0].main == "Rain"){
        image.src = "weather-app-img/images/rain.png"
    }
    else if(result.weather[0].main == "Drizzle"){
        image.src = "weather-app-img/images/drizzle.png"
    }
    else if(result.weather[0].main == "Mist"){
        image.src = "weather-app-img/images/mist.png"
    }
    else if(result.weather[0].main == 'Snow'){
        image.src = "weather-app-img/images/snow.png";
    }
    else if(result.weather[0].main == "Smoke"){
        image.src = "weather-app-img/images/smoke.png"
    }
    else if(result.weather[0].main == "Haze"){
        image.src = "https://www.accuweather.com/images/whiteweathericons/1.svg"
        image.style.width = "5.8rem"
        image.style.height = "5.8rem"
        image.style.paddingBottom = "0.5rem"
        image.style.paddingTop = "1rem"
    }
    weatherDetail.style.display = "block"
    document.querySelector(".error").style.display = "none";
}