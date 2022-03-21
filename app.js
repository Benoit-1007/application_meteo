'use strict'

let chosenCity, currentLongitude, currentLatitude ;
let city                = document.querySelector('#city');
let temperature         = document.querySelector('#temperature_label');
let chooseCityButton    = document.querySelector('#change');

async function  getTempByCoords(longitude, latitude) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lon=${longitude}&lat=${latitude}&appid=7f1847f2051069868ea8e7e0ecf5f4a4
&units=metric`;

    const requete = await fetch(url, {
        method: 'GET'
    })

    if(!requete.ok) {
        alert('Un problème est survenu. Merci de revenir plus tard.')
    }
    else{
        let data = await requete.json();
        
        city.textContent = data.name;
        temperature.textContent = data.main.temp;
    }
}

async function getTempByName(currentCity) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=7f1847f2051069868ea8e7e0ecf5f4a4
&units=metric`;

    const requete = await fetch(url, {
        method: 'GET'
    })

    if(!requete.ok) {
        alert('Un problème est survenu. Merci de revenir plus tard.')
    }
    else{
        let data = await requete.json();
        
        city.textContent = currentCity;
        temperature.textContent = data.main.temp;
    }
}

chooseCityButton.addEventListener('click',() => {
    chosenCity = prompt('Choisissez une nouvelle ville:');
    getTempByName(chosenCity);
})

if('geolocation' in navigator) {
    navigator.geolocation.watchPosition((position) => {

        currentLongitude = position.coords.longitude;
        currentLatitude =position.coords.latitude;

        getTempByCoords(currentLongitude, currentLatitude);
    }, error, options)
} else {
    chosenCity = 'Lyon';
    getTempByName(chosenCity);
}


function error() {
    chosenCity = 'Lyon';
    getTempByName(chosenCity);
}

var options = {
    enableHighAccuracy: true
}