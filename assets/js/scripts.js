/* variables */
// If there is nothing in hourSave set hourSave to an empty array
var aCitySave = JSON.parse(localStorage.getItem('citySave')) || [];


var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#userCity");
var repoContainerEl = document.querySelector("#repos-container");
// var repoSearchTerm = document.querySelector("#repo-search-term");
var userCity = "";
var curCond = {
  curCityDate: document.getElementById("curCityDate"),
  curIcon: document.getElementById("curIcon"),
  curTemp: document.getElementById("curTemp"),
  curWind: document.getElementById("curWind"),
  curHum: document.getElementById("curHum"),
  curUV: document.getElementById("curUV"),
  uvFormat: document.getElementById("uvFormat")
}
var formSubmitHandler = function (event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  userCity = nameInputEl.value.trim();

  if (userCity) {
    getUserWeather(userCity);

    // clear old content
    repoContainerEl.textContent = "";
    nameInputEl.value = "";
  } else {
    alert("Please enter a city");
  }
};

//save to 5 recent searches to local storage
var saveCity = function (city) {
  if (aCitySave.includes(city)) {return};
  if (aCitySave.length > 5) {
      aCitySave.shift();
    }
    aCitySave.push(city)
    localStorage.setItem("citySave", JSON.stringify(aCitySave));
}


var getUserWeather = function (inputCity) {
  // format the github api url
  //Use older 'weather' call to get the weather details by city as required by user input requirements  
  //http://api.openweathermap.org/data/2.5/weather?q=dayton&appid=f0fb5a2fd74295d57b15c5c4bd25d82f

  //Use One Call to get the full weather details for required UI  
  //https://api.openweathermap.org/data/2.5/onecall?lat=39.7589&lon=-84.1916&exclude=minutely,hourly,alerts&appid=f0fb5a2fd74295d57b15c5c4bd25d82f

  var apiUrlCity = "http://api.openweathermap.org/data/2.5/weather?q=" + inputCity + "&appid=f0fb5a2fd74295d57b15c5c4bd25d82f";

  // make a get request to url
  fetch(apiUrlCity)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        response.json().then(function (data) {
          userCity = data.name;
          saveCity(userCity)
          getonecall(data.coord.lat, data.coord.lon);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Open Weather Map API");
    });
};

var getonecall = function (lat, lon) {
  var apiUrlonecall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat +
    "&lon=" + lon +
    "&exclude=minutely,hourly,alerts" +
    "&units=imperial" +
    "&appid=f0fb5a2fd74295d57b15c5c4bd25d82f";

  fetch(apiUrlonecall)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        response.json().then(function (data) {
          loadUI(data.current, data.daily);
          
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Open Weather Map API One Call");
    });

}

var loadUI = function (current, forecast) {
  curCond.curCityDate.textContent = userCity + " (" + Cur_Unix_Date(current.dt) + ")";
  formatIcon(curCond.curIcon, current.weather[0]);
  curCond.curTemp.innerHTML = "Temp: " + current.temp + ' °F';
  curCond.curWind.innerHTML = "Wind: " + current.wind_speed + " MPH";
  curCond.curHum.innerHTML = "Humidity: " + current.humidity + " %";
  curCond.curUV.innerHTML = "UV Index: ";
  curCond.uvFormat.innerHTML = current.uvi;
  curCond.uvFormat.classList.remove("favorable", "moderate", "severe");

  $("#5-day").empty();
  for (i = 0; i < 5; i++) {
    
    $("#5-day").append($("<div>").addClass("sm-card col-lg-2").attr("id", "card-body-" + i));
    $("#card-body-" + i).append($("<h2>").addClass("card-title").text(Cur_Unix_Date(forecast[i].dt)));
    $("#card-body-" + i).append($("<img>").addClass("card-text mt").attr("id", "img-" + i));
    
    formatIcon(document.getElementById("img-" + i), forecast[i].weather[0]);
    $("#card-body-" + i).append($("<p>").addClass("card-title").text("Temp: " + forecast[i].temp.max + ' °F'));
    $("#card-body-" + i).append($("<p>").addClass("card-title").text("Wind: " + forecast[i].wind_speed + " MPH"));
    $("#card-body-" + i).append($("<p>").addClass("card-title").text("Humidity: " + forecast[i].humidity + " %"));
  }

  if (current.uvi <= 2) { curCond.uvFormat.classList.add("favorable"); return }
  if (current.uvi <= 5) { curCond.uvFormat.classList.add("moderate"); return }
  if (current.uvi > 5) { curCond.uvFormat.classList.add("severe"); return }
}


var formatIcon = function (elImg, weather) {
  // console.log(elImg, weather);

  elImg.alt = weather.main;
  //http://openweathermap.org/img/wn/10d@2x.png
  elImg.src = "http://openweathermap.org/img/wn/" + weather.icon + "@2x.png";
  elImg.width = "60";
  elImg.height = "30";
}

var Cur_Unix_Date = function (t) {
  var dt = new Date(t * 1000).toLocaleDateString();
  return dt;
}



// add event listeners to forms
userFormEl.addEventListener("submit", formSubmitHandler);
