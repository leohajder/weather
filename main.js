$(function () {
    var openWeatherMap = {
        units: "metric",
        appID: "80a78670ec00c834d491f558f16673c4"
    }; // register on openweathermap.org for free to get yours

    function getLocation() {
        $.getJSON("https://freegeoip.net/json/?callback=?", function (response) {
            if (response.city) {
                getWeatherByCity(response);
            } else if (response.latitude) {
                getWeatherByCoordinates(response);
            } else {
                $("#out").text("Unable to reach freegeoip.net");
            }
        });
    }

    function getWeatherByCity(data) {
        $.getJSON("https://api.openweathermap.org/data/2.5/weather?" +
            "q=" + data.city +
            "&units=" + openWeatherMap.units +
            "&appid=" + openWeatherMap.appID,
            function (response) {
                if (response.weather) {
                    displayWeather(response);
                } else {
                    $("#out").text("Unable to reach openweathermap.org");
                }
            }
        );
    }

    function getWeatherByCoordinates(data) {
        $.getJSON("https://api.openweathermap.org/data/2.5/weather?" +
            "lat=" + data.latitude +
            "&lon=" + data.longitude +
            "&units=" + openWeatherMap.units +
            "&appid=" + openWeatherMap.appID,
            function (response) {
                if (response.weather) {
                    displayWeather(response);
                } else {
                    $("#out").text("Unable to reach openweathermap.org");
                }
            }
        );
    }

    function displayWeather(data) {
        $("#city").text(data.name);
        $("#country").text(data.sys.country);
        $("#temperature").text(data.main.temp);
        if (openWeatherMap.units === "metric") {
            $("#units").text("°C");
        } else {
            $("#units").text("°F");
        }
        $("#weather").text(data.weather[0].main);
        $("#description").text(data.weather[0].description);
        $("#icon").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
    }

    $("#units").click(function () {
        if (openWeatherMap.units === "metric") {
            openWeatherMap.units = "imperial";
        } else {
            openWeatherMap.units = "metric";
        }
        getLocation();
    });

    getLocation();
});
