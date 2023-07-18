
const apiKey = "a412362281ea5ee71f284d3aa86cfc6b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const userSearch = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const audio = new Audio('./assets/errMessage.mp3')


async function checkWeather(city){
    if (!city) {
        audio.play();
        alert("Please enter a city or country name");
        return;
    }
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if(response.status === 404){
        audio.play();
    alert("please entre a valid city or country name")
        document.querySelector(".weather").style.display = "none"
    }else{
        document.querySelector(".weather").style.display = "block"
      
    }
    userSearch.value = ' ' // clear the user input so the new name can enter without any effort
    
     const data = await response.json();
     console.log(data);

    
     document.querySelector('.city').innerHTML = data.name;
     document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
     document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
     document.querySelector('.wind').innerHTML = data.wind.speed + "km/h";


    
     if(data.weather[0].main === "Clouds"){
        weatherIcon.src = 'assets/clouds.png'
     }
     else if(data.weather[0].main === "Clear"){
        weatherIcon.src = 'assets/clear.png'
     }
     else if(data.weather[0].main === "Rain"){
        weatherIcon.src = 'assets/rain.png'
     }
     else if(data.weather[0].main === "Drizzle"){
        weatherIcon.src = 'assets/drizzle.png'
     }
     else if(data.weather[0].main === "Mist"){
        weatherIcon.src = 'assets/mist.png'
     }
}
searchBtn.addEventListener('click', () => {
    checkWeather(userSearch.value);

})

