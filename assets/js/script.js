$(function () {
  const apiKey = "5ec3f4bc98430f28dafcf83dc1eaacc4";

  function saveSearch(city) {
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
    if (searchHistory.indexOf(city) === -1) {
      searchHistory.push(city);
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    }
  }

  function displayWeather(response) {
    var forecast = response.list;
    var j = 1;
    for (var i = 0; i < forecast.length; i++) {
      var fDate = dayjs().add(j, "day").format("MM/DD/YYYY");
      var fTemp = forecast[i].main.temp;
      var fHumidity = forecast[i].main.humidity;
      var fWind = forecast[i].wind.speed;
      $("#day" + j).text(fDate);
      $("#temp" + j).text("Temperature: " + fTemp + "°F");
      $("#humidity" + j).text("Humidity: " + fHumidity + "%");
      $("#wind" + j).text("Wind Speed: " + fWind + " MPH");
      j++;
    }
  }

  function getWeather(city) {
    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        apiKey +
        "&units=imperial",
      method: "GET",
    }).then(function (response) {
      todayWeather(response);
    });

    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&appid=" +
        apiKey +
        "&units=imperial",
      method: "GET",
    }).then(function (response) {
      displayWeather(response);
    });
  }

  function todayWeather(response) {
    var today = dayjs().format("MM/DD/YYYY");
    var temp = response.main.temp;
    var humidity = response.main.humidity;
    var wind = response.wind.speed;

    $("#city").text("City: " + response.name + " " + today);
    $("#temp").text("Temperature: " + temp + "°F");
    $("#humidity").text("Humidity: " + humidity + "%");
    $("#wind").text("Wind Speed: " + wind + " MPH");
  }

  $("#search-button").on("click", function () {
    var city = $("#search-bar").val().trim();
    getWeather(city);
  });
});
