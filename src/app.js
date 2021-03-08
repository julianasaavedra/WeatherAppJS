function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if(hours<10){
        hours=`0${hours}`;
    }
    let minutes = date.getMinutes();
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day=days[date.getDay()];
    if(minutes<10){
        minutes=`0${minutes}`;
    }
    return `${day} ${hours}:${minutes}`;
}

function showTemperature(response){
    let cityElement=document.querySelector("#city");
    let temperatureElement=document.querySelector("#currentTemperature");
    let conditionsElement=document.querySelector("#currentConditions");
    let humidityElement = document.querySelector("#humidity");
    let windElement=document.querySelector("#wind");
    let dateElement=document.querySelector("#date");
    let iconElement=document.querySelector("#icon");
    cityElement.innerHTML=response.data.name;
    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    conditionsElement.innerHTML=response.data.weather[0].description;
    humidityElement.innerHTML=response.data.main.humidity;
    windElement.innerHTML=Math.round(response.data.wind.speed);
    dateElement.innerHTML=formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt",response.data.weather[0].description);
    celsiusTemp=response.data.main.temp;
}

function search(city){
    let apiKey = "21fd182fccb9e77383ba25f615e7b658";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement=document.querySelector("#city-input");
    search(cityInputElement.value);
}

function showFahrenheit(event){
    event.preventDefault();
    let fahrenheitTemp=(celsiusTemp*9)/5+32;
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperatureElement=document.querySelector("#currentTemperature");
    temperatureElement.innerHTML=Math.round(fahrenheitTemp);
}

function showCelsius(event){
    event.preventDefault();
    let temperatureElement=document.querySelector("#currentTemperature");
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    temperatureElement.innerHTML=Math.round(celsiusTemp);
}

search("Toronto");

let celsiusTemp=null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink=document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink=document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);