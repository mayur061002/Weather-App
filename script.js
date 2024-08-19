const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () =>{
    const APIKey = '0dacd4aec1193a0ffb0fec0f760a2799';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`).then(response => response.json()).then(json => {
        if(json.cod === '404'){
            container.style.height = "400px";
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        };

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temp');
        const description = document.querySelector('.weather-box .desc');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (json.weather['0'].main){
            case 'Clear':
                image.src = 'img/clear.png';
                break;

            case 'Rain':
                image.src = 'img/rain.png';
                break;
                
            case 'Snow':
                image.src = 'img/snow.png';
                break;
                
            case 'Clouds':
                image.src = 'img/clouds.png';
                break;
                
            case 'Haze':
                image.src = 'img/haze.png';
                break;

            case 'broken':
                image.src = 'img/broken.png';
                break;

            default:
                image.src = 'img/404.png';
        };


        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';

    });

});

 



