$(function () {
  const apiKey = "5ec3f4bc98430f28dafcf83dc1eaacc4";

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
