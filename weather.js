const COORDS = 'coords';

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, //latitude : latitude, key와 value가 같다면 그냥 저렇게 처리할 수 있다.
        longitude //longitude : longitude
    };
    saveCoords(coordsObj);
}

function handleGeoError() {
    console.log('cant access get location');
}


function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords === null) {
        askForCoords();
    }else {
        // getWeather
    }
}

function init() {
    loadCoords();
}

init();