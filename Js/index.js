
const temperature = document.querySelector(".temperature");
const option = document.querySelector(".tempOption");
const dropdown = document.querySelector(".dropdown-menu");
const icon = document.querySelector("#temp");
const warning = document.querySelector(".warning-alert");
const danger = document.querySelector(".danger-alert");
const search = document.getElementById("search");
const input = document.querySelector("input");
let CityName = document.querySelector(".CityName");
let CountryName = document.querySelector(".CountryName");
let weatherCondition = document.querySelector(".weatherCondition");
let degreeFeel = document.querySelector(".degreeFeel");
let humidity = document.querySelector(".humidity");
let speed = document.querySelector(".speed");
let degree = document.querySelector(".degree");
let weatherDescription = document.querySelector(".weatherDescription");
let weatherIcon = document.querySelector(".weatherIcon");
const locationBtn = document.querySelector(".locationBtn");
const errorLocation = document.querySelector("#errorLocation");
const notFound = document.querySelector("#notFound");
const kelvin = document.querySelector(".kelvin");
const fahrenheit = document.querySelector(".fahrenheit");
const celcius = document.querySelector(".celcius");
let element = document.getElementsByClassName("CountryName")[0];


// DropDown Part
temperature.addEventListener("click" , () => {dropdown.classList.toggle("active");
icon.classList.toggle("change-icon")});

const date = document.querySelector(".date");
date.innerHTML=`${new Date().toLocaleDateString('en-us' , {weekday:"long" , year:"numeric" , month:"short" , day:"numeric"})}`

const listOption = document.querySelectorAll("li");
const listOptionsTemp = Array.from(listOption);

listOptionsTemp.forEach((elem) => {
    elem.addEventListener("click" , () => {option.innerHTML=elem.innerHTML})
})

// Alerts & Weather Data
let cityName="new delhi";
let unit='metric';
const handleWeatherData = async (city,units) => {
 try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=144aa68c6f2ae4f87891c1922e196c67&units=${units}`)
    const result = await response.json();
    console.log(result);

    CityName.innerHTML=result.name;
    result.name==undefined?(CityName.innerHTML="New Delhi"):(CityName.innerHTML=result.name);
    CountryName.innerHTML=result.sys.country;
    


    if(result.weather[0].id>=200 && result.weather[0].id<=232){
        weatherCondition.setAttribute("src" , "Assets/thunderstorm.png")
    }
    else if(result.weather[0].id>=300 && result.weather[0].id<=321){
        weatherCondition.setAttribute("src" , "Assets/drizzle.png")
    }
    else if(result.weather[0].id>=500 && result.weather[0].id<=531){
        weatherCondition.setAttribute("src" , "Assets/rainy.png")
    }
    else if(result.weather[0].id>=600 && result.weather[0].id<=622){
        weatherCondition.setAttribute("src" , "Assets/snow.png")
    }
    else if(result.weather[0].id>=701 && result.weather[0].id<=781){
        weatherCondition.setAttribute("src" , "Assets/fog.png")
    }
    else if(result.weather[0].id==800 ){
        weatherCondition.setAttribute("src" , "Assets/sun.png")
    }
    else{
        weatherCondition.setAttribute("src" , "Assets/partly-cloudy.png")
    }
    
    
    if(units=="metric"){
        degree.innerHTML=`${Math.trunc(result.main.temp)}°C`;
        degreeFeel.innerHTML=`${Math.trunc(result.main.feels_like)}°C`;
    }
    else if(units=="imperial"){
        degree.innerHTML=`${Math.trunc(result.main.temp)}°F`; 
        degreeFeel.innerHTML=`${Math.trunc(result.main.feels_like)}°F`;
    }
    else{
        degree.innerHTML=`${Math.trunc(result.main.temp)}°K`; 
        degreeFeel.innerHTML=`${Math.trunc(result.main.feels_like)}°K`;
    }
    weatherDescription.innerHTML=result.weather[0].description;
    weatherIcon.setAttribute("src" , `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`);
    humidity.innerHTML=`${Math.trunc(result.main.humidity)}%`;
    speed.innerHTML=`${Math.trunc(result.wind.speed)}Km/hr`;
 }
 catch(error){
    notFound.classList.add("removedD");
    setTimeout(() => {
     notFound.classList.remove("removedD");
 }, 3000);
 }
}
search.addEventListener("click" , () => {
    if(input.value === ""){
        warning.classList.add("removedW");
        setTimeout(() => {
            warning.classList.remove("removedW");
        }, 2000);
    }
    else{
         cityName = input.value;
        if(option.innerHTML==="Celcius"){
           unit='metric'
        }
        else if(option.innerHTML==="Fahrenheit"){
            unit='imperial'
        }
        else{
            unit='standard'
        }
        handleWeatherData(cityName,unit);
        input.value=""
    }
})

// Default Weather starts

let defaultWeather = async () => {
 try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=144aa68c6f2ae4f87891c1922e196c67&units=${unit}`)
    const result = await response.json();
    console.log(result);
    
    CityName.innerHTML=result.name;
    CountryName.innerHTML=result.sys.country;

    if(result.weather[0].id>=200 && result.weather[0].id<=232){
        weatherCondition.setAttribute("src" , "Assets/thunderstorm.png")
    }
    else if(result.weather[0].id>=300 && result.weather[0].id<=321){
        weatherCondition.setAttribute("src" , "Assets/drizzle.png")
    }
    else if(result.weather[0].id>=500 && result.weather[0].id<=531){
        weatherCondition.setAttribute("src" , "Assets/rainy.png")
    }
    else if(result.weather[0].id>=600 && result.weather[0].id<=622){
        weatherCondition.setAttribute("src" , "Assets/snow.png")
    }
    else if(result.weather[0].id>=701 && result.weather[0].id<=781){
        weatherCondition.setAttribute("src" , "Assets/fog.png")
    }
    else if(result.weather[0].id==800 ){
        weatherCondition.setAttribute("src" , "Assets/sun.png")
    }
    else{
        weatherCondition.setAttribute("src" , "Assets/partly-cloudy.png")
    }
    
    weatherDescription.innerHTML=result.weather[0].description;
    degree.innerHTML=`${Math.trunc(result.main.temp)}°C`;
    degreeFeel.innerHTML=`${Math.trunc(result.main.feels_like)}°C`;
    humidity.innerHTML=`${Math.trunc(result.main.humidity)}%`;
    speed.innerHTML=`${Math.trunc(result.wind.speed)}Km/hr`;
 }
 catch(error){
   danger.classList.add("removedD");
   setTimeout(() => {
    danger.classList.remove("removedD");
}, 2000);
 }
}
defaultWeather();

// GeoLocaton Weather 

const handleGeolocation = async (lat,lon,unit) => {
    try{
        const response = await fetch(` https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=144aa68c6f2ae4f87891c1922e196c67&units=${unit}`)
        const result = await response.json();
        console.log(result);
        
    
        CityName.innerHTML=result.name;
        cityName=result.name;
        CountryName.innerHTML=result.sys.country;
    
        if(result.weather[0].id>=200 && result.weather[0].id<=232){
            weatherCondition.setAttribute("src" , "Assets/thunderstorm.png")
        }
        else if(result.weather[0].id>=300 && result.weather[0].id<=321){
            weatherCondition.setAttribute("src" , "Assets/drizzle.png")
        }
        else if(result.weather[0].id>=500 && result.weather[0].id<=531){
            weatherCondition.setAttribute("src" , "Assets/rainy.png")
        }
        else if(result.weather[0].id>=600 && result.weather[0].id<=622){
            weatherCondition.setAttribute("src" , "Assets/snow.png")
        }
        else if(result.weather[0].id>=701 && result.weather[0].id<=781){
            weatherCondition.setAttribute("src" , "Assets/fog.png")
        }
        else if(result.weather[0].id==800 ){
            weatherCondition.setAttribute("src" , "Assets/sun.png")
        }
        else{
            weatherCondition.setAttribute("src" , "Assets/partly-cloudy.png")
        }
        
        
        if(unit=="metric"){
            degree.innerHTML=`${Math.trunc(result.main.temp)}°C`;
            degreeFeel.innerHTML=`${Math.trunc(result.main.feels_like)}°C`;
        }
        else if(unit=="imperial"){
            degree.innerHTML=`${Math.trunc(result.main.temp)}°F`; 
            degreeFeel.innerHTML=`${Math.trunc(result.main.feels_like)}°F`;
        }
        else{
            degree.innerHTML=`${Math.trunc(result.main.temp)}°K`; 
            degreeFeel.innerHTML=`${Math.trunc(result.main.feels_like)}°K`;
        }
        weatherDescription.innerHTML=result.weather[0].description;
        console.log(weatherDescription.innerHTML);
        weatherIcon.setAttribute("src" , `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`);
        humidity.innerHTML=`${Math.trunc(result.main.humidity)}%`;
        speed.innerHTML=`${Math.trunc(result.wind.speed)}Km/hr`;
     }
     catch(error){
        console.log(error);
        danger.classList.add("removedD");
        setTimeout(() => {
         danger.classList.remove("removedD");
     }, 2000);
     }
}

const gotLocation = (position) => {
 console.log(position.coords);
 let lat = position.coords.latitude;
 let lon = position.coords.longitude;
 if(option.innerHTML==="Celcius"){
    unit='metric'
 }
 else if(option.innerHTML==="Fahrenheit"){
     unit='imperial'
 }
 else{
    unit='standard'
 }
 handleGeolocation(lat,lon,unit)
}

const failedToGetLocation = () => {
    errorLocation.classList.add("removedD");
    setTimeout(() => {
        errorLocation.classList.remove("removedD");
    }, 2000);  
}

const handleLocation = async () => {
    navigator.geolocation.getCurrentPosition(gotLocation , failedToGetLocation);
}

locationBtn.addEventListener("click" , handleLocation)

// Temperature Oriented Weather Starts

// Celcius
const  handleTemperatureOption = async (city,units) => {
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=144aa68c6f2ae4f87891c1922e196c67&units=${units}`)
        const result = await response.json();
        console.log(result);
    
        CityName.innerHTML=result.name;
        result.name==undefined?(CityName.innerHTML="New Delhi"):(CityName.innerHTML=result.name);
        CountryName.innerHTML=result.sys.country;
    
        if(result.weather[0].id>=200 && result.weather[0].id<=232){
            weatherCondition.setAttribute("src" , "Assets/thunderstorm.png")
        }
        else if(result.weather[0].id>=300 && result.weather[0].id<=321){
            weatherCondition.setAttribute("src" , "Assets/drizzle.png")
        }
        else if(result.weather[0].id>=500 && result.weather[0].id<=531){
            weatherCondition.setAttribute("src" , "Assets/rainy.png")
        }
        else if(result.weather[0].id>=600 && result.weather[0].id<=622){
            weatherCondition.setAttribute("src" , "Assets/snow.png")
        }
        else if(result.weather[0].id>=701 && result.weather[0].id<=781){
            weatherCondition.setAttribute("src" , "Assets/fog.png")
        }
        else if(result.weather[0].id==800 ){
            weatherCondition.setAttribute("src" , "Assets/sun.png")
        }
        else{
            weatherCondition.setAttribute("src" , "Assets/partly-cloudy.png")
        }
        
        console.log(units);
        
        if(units=="metric"){
            degree.innerHTML=`${Math.trunc(result.main.temp)}°C`;
            degreeFeel.innerHTML=`${Math.trunc(result.main.feels_like)}°C`;
        }
        else if(units=="imperial"){
            degree.innerHTML=`${Math.trunc(result.main.temp)}°F`; 
            degreeFeel.innerHTML=`${Math.trunc(result.main.feels_like)}°F`;
        }
        else{
            degree.innerHTML=`${Math.trunc(result.main.temp)}°K`; 
            degreeFeel.innerHTML=`${Math.trunc(result.main.feels_like)}°K`;
        }
        weatherDescription.innerHTML=result.weather[0].description;
        console.log(weatherDescription.innerHTML);
        weatherIcon.setAttribute("src" , `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`);
        humidity.innerHTML=`${Math.trunc(result.main.humidity)}%`;
        speed.innerHTML=`${Math.trunc(result.wind.speed)}Km/hr`;
     }
     catch(error){
        notFound.classList.add("removedD");
        setTimeout(() => {
         notFound.classList.remove("removedD");
     }, 3000);
     }
}
celcius.addEventListener("click" , () => {
       unit='metric'
    handleTemperatureOption(cityName,unit);
});
fahrenheit.addEventListener("click" , () => {
       unit='imperial'
    handleTemperatureOption(cityName,unit);
});
kelvin.addEventListener("click" , () => {
       unit='standard'
    handleTemperatureOption(cityName,unit);
});

// Temperature Oriented Weather Ends





