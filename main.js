/* global $ */

var openWeatherMap = {
  units: 'metric',
  appID: '<register on openweathermap.org for free to get yours>'
}

$(function () {
  getLocation()

  $('#units').click(function () {
    if (openWeatherMap.units === 'metric') {
      openWeatherMap.units = 'imperial'
    } else {
      openWeatherMap.units = 'metric'
    }

    $('#units').blur()

    getLocation()
  })

  $('[data-toggle="tooltip"]').tooltip()
})

function getLocation() {
  $.ajax({
    url: 'https://ipapi.co/json'
  }).done(function (response) {
    if (response.city) {
      getWeatherByCity(response)
    } else if (response.latiude) {
      getWeatherByCoordinates(response)
    }
  }).fail(function () {
    $('#out').text('Unable to reach ipapi.co. Try disabling AdBllocker.')
  })
}

function getWeatherByCity(data) {
  $.ajax({
    url: 'https://api.openweathermap.org/data/2.5/weather?' +
      'q=' + data.city +
      '&units=' + openWeatherMap.units +
      '&appid=' + openWeatherMap.appID
  }).done(function (response) {
    displayWeather(response)
  }).fail(function () {
    $('#out').text('Unable to reach openweathermap.org. Try disabling AdBlocker.')
  })
}

function getWeatherByCoordinates(data) {
  $.ajax({
    url: 'https://api.openweathermap.org/data/2.5/weather?' +
      'lat=' + data.latitude +
      '&lon=' + data.longitude +
      '&units=' + openWeatherMap.units +
      '&appid=' + openWeatherMap.appID
  }).done(function (response) {
    displayWeather(response)
  }).fail(function () {
    $('#out').text('Unable to reach openweathermap.org. Try disabling AdBlocker.')
  })
}

function displayWeather(data) {
  $('#city').text(data.name)
  $('#country').text(', ' + data.sys.country)
  $('#temperature').text(Math.round(data.main.temp))
  if (openWeatherMap.units === 'metric') {
    $('#units').text('°C')
  } else {
    $('#units').text('°F')
  }
  $('#units').show()
  $('#weather').text(data.weather[0].main)
  $('#description').text(' - ' + data.weather[0].description)
  $('#icon').attr('src', 'https://openweathermap.org/img/w/' +
    data.weather[0].icon + '.png')
}
