const apiKey = "5ec3f4bc98430f28dafcf83dc1eaacc4";

function getWeather(city) {
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      key +
      "&units=imperial",
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
}
