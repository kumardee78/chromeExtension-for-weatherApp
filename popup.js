const searchBtn = document.querySelector("#searchbtn")
const weatherDetail = document.querySelector(".weatherDetail")

searchBtn.addEventListener("click", getWeather)
async function getWeather(){
    const city = document.getElementById('cityInput').value;
    console.log(city)
    
    const url = `https://weather-api138.p.rapidapi.com/weather?city_name=${city}&units=metric`;
    const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '9e4505caadmshd0ccc38f8669f77p14772ejsnf3618d5eb0ba',
        'X-RapidAPI-Host': 'weather-api138.p.rapidapi.com'
    }};
    const response = await fetch(url, options);
    if(city == ""){
        document.querySelector(".error").style.display = "block";
        weatherDetail.style.display = "none";
    }else{
        const result = await response.json();
        console.log(result);
        showWeatherData(result);
    }
}  
function showWeatherData(result){
    weatherDetail.innerHTML = "";

    const image = document.createElement("img")
    image.classList.add("weather-icon")

    const temperature = document.createElement("h1")
    temperature.classList.add("temp")

    const cityName = document.createElement("h2")
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
    weatherDetail.append(image, temperature, cityName, lowerDiv);


    temperature.innerHTML = result.main.temp + " °C"
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
    else if(result.weather[0].main == "Haze"){
        image.src = "https://www.accuweather.com/images/whiteweathericons/1.svg"
        image.style.width = "5.8rem"
        image.style.height = "5.8rem"
        image.style.paddingBottom = "0.5rem"
    }
    document.getElementById('cityInput').value = ""
    weatherDetail.style.display = "block"
    document.querySelector(".error").style.display = "none";
}