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

function formatTime(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if(hours<10){
        hours=`0${hours}`;
    }
    let minutes = date.getMinutes();
    if(minutes<10){
        minutes=`0${minutes}`;
    }
    return`${hours}:${minutes}`;
}

function showTemperature(response){
    console.log(response.data);
    let cityElement=document.querySelector("#city");
    let temperatureElement=document.querySelector("#currentTemperature");
    let conditionsElement=document.querySelector("#currentConditions");
    let pressureElement=document.querySelector("#pressure"); 
    let humidityElement = document.querySelector("#humidity");
    let windElement=document.querySelector("#wind");
    let dateElement=document.querySelector("#date");
    let iconElement=document.querySelector("#icon");
    cityElement.innerHTML=response.data.name;
    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    conditionsElement.innerHTML=response.data.weather[0].description;
    pressureElement.innerHTML=response.data.main.pressure;
    humidityElement.innerHTML=response.data.main.humidity;
    windElement.innerHTML=Math.round(response.data.wind.speed);
    dateElement.innerHTML=formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt",response.data.weather[0].description);
    celsiusTemp=response.data.main.temp;
}

function showForecast(response){
    let forecastElement=document.querySelector("#forecast");
    let forecast=null ;
    forecastElement.innerHTML=null;
    for(let index=0;index<6;index++)
    {
        forecast=response.data.list[index];
        forecastElement.innerHTML+=
            `<div class="col-2">
                <h3>
                    ${formatTime(forecast.dt*1000)}
                </h3>
                <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="${forecast.weather[0].description}"/>
                <div class="forecast-temperature"> 
                    <strong>${Math.round(forecast.main.temp_max)}°</strong> ${Math.round(forecast.main.temp_min)}°
                </div>
            </div>`;
    }
}

function search(city){
    let apiKey = "21fd182fccb9e77383ba25f615e7b658";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
    apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showForecast);
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