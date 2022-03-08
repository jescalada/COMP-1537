function ajaxGet() {
    let cityName = jQuery('#city-name-input').val();
    $.ajax(
        {
            // browser url we're trying to reach
            // appid is replaced with the API key we get (unique)
            "url":`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=a35e169d3416373244a7aae233af3555&units=metric`,
            "type": "GET",
            // executes a handler function if a reply is received from the server
            "success": processRequest
        }
    )
}

function processRequest(data) {
    $('#temperature').html(data.main.temp);
    $('#feels-like').html(data.main.feels_like);
    $('#location').html(data.name);
    let icon_url = data.weather[0].icon;
    $("#weather-icon").attr("src", `http://openweathermap.org/img/wn/${icon_url}@2x.png`);
}

function setup(){
    $('#get-temperature-button').click(ajaxGet);
}

$(document).ready(setup);