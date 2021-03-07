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
    iconElement.innerHTML=`http://openweathermap.org/img/wn/04d@2x.png`;
}
let apiKey = "21fd182fccb9e77383ba25f615e7b658";
let city = "New York";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`;
//let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
//let finalUrl = `${apiUrl}lat=${latitude}&lon=${longitude}&APPID=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);