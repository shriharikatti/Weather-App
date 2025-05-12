document.addEventListener("DOMContentLoaded", ()=> {
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const cityName = document.getElementById('city-name');
    const temp = document.getElementById('temp');
    const weatherType = document.getElementById('weather-type');

    const feelsLike = document.getElementById('feels-like');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');

    const Loading = document.getElementById('loading');
    const errorMessage = document.getElementById('error');
    const weatherIcon = document.getElementById('weather-icon');
    const weatherDisplay  = document.getElementById('weather-display');
    const weatherInfo = document.getElementById('weather-info');
    
    console.log('weather Info Display:', getComputedStyle(weatherInfo).display)
    const weatherIcons = {
    'clear': 'assets/sun.png',
    'clouds': 'assets/sun-cloud.png',    
    'rain': 'assets/rain.png',           
    'snow': 'assets/snow.png',
    'thunderstorm': 'assets/thunderstorm.png',
    'drizzle': 'assets/sun-rain.png',    
    'mist': 'assets/mist.png'            
};

    searchBtn.addEventListener('click', async()=> {
        const city = cityInput.value;
        if(city){
            await getWeatherDetails(city);
        }
        else{
            errorMessage.textContent = 'Please Enter City Name';
            errorMessage.style.display = 'block';
            console.log(errorMessage);
            weatherDisplay.classList.add('hidden');
            weatherInfo.classList.add('hidden');

        }
    })

    async function getWeatherDetails(city){

        Loading.style.display = 'block';
        weatherIcon.style.display = 'none';
        errorMessage.style.display = 'none';
        weatherDisplay.classList.remove('hidden');
        


        const URL = `${window.location.origin}/api/weather?city=${city}`;
;

        fetch(URL)
        .then(response =>{
            if(!response.ok)
                throw new Error('City Not Found! or Invalid Request!');
                console.log(`Api Request Failed: ${response.statusText}`)
            return response.json()
    })      
        .then(data => {
            Loading.style.display = 'none';
            if(data.cod && data.cod!== 200){
                throw new Error(data.message);
            }
            console.log(data);
            errorMessage.style.display ='none';
            cityName.textContent = data.name;
            temp.textContent = `${Math.round(data.main.temp)}°C`;
            weatherType.textContent = data.weather[0].description;

            feelsLike.textContent = `Feels like: ${data.main.feels_like}°C`;
            humidity.textContent = `Humidity: ${data.main.humidity}%`;
            windSpeed.textContent = `Wind: ${data.wind.speed}km/h`;

            const condition = data.weather[0].main.toLowerCase();
            weatherIcon.src = weatherIcons[condition] || `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            weatherIcon.style.display = 'block';

            weatherDisplay.classList.remove('hidden');
            weatherInfo.classList.remove('hidden');
            weatherInfo.classList.add('visible');

            
        })
        .catch((error) =>{
            Loading.style.display = 'none';
            errorMessage.textContent = error.message;
            errorMessage.style.display = 'block';
            weatherDisplay.classList.add('hidden');
            weatherInfo.classList.remove('visible');
            weatherInfo.classList.add('hidden');
            console.log('Error:', error);
        });

    }

})