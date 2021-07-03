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
  curUV: document.getElementById("uvFormat")
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
      alert("Unable to connect to Open Weather Map API");
    });

}

var loadUI = function (current, forecast) {
  curCond.curCityDate.textContent = userCity + " (" + Cur_Unix_Date(current.dt) + ")";
  formatIcon(curCond.curIcon, current.weather[0]);
  curCond.curTemp.innerHTML = "Temp: " + current.temp + '°F';
  curCond.curWind.innerHTML = "Wind: " + current.wind_speed + " MPH";
  curCond.curHum.innerHTML = "Humidity: " + current.humidity + " %";
  curCond.curUV.innerHTML = current.uvi;
}


var formatIcon = function (elImg, weather) {
  console.log(elImg, weather);
  elImg.alt = weather.main;
  //http://openweathermap.org/img/wn/10d@2x.png
  elImg.src = "http://openweathermap.org/img/wn/" + weather.icon + "@2x.png";
}

var Cur_Unix_Date = function (t) {
  var dt = new Date(t * 1000).toLocaleDateString();
  return dt;
}

// var displayRepos = function (repos, searchTerm) {
//   // check if api returned any repos
//   if (repos.length === 0) {
//     repoContainerEl.textContent = "No repositories found.";
//     return;
//   }
//   // create a link for each repo
//   var repoEl = document.createElement("a");
//   repoEl.classList = "list-item flex-row justify-space-between align-center";
//   repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);
//   repoSearchTerm.textContent = searchTerm;

//   // loop over repos
//   for (var i = 0; i < repos.length; i++) {
//     // format repo name
//     var repoName = repos[i].owner.login + "/" + repos[i].name;

//     // create a container for each repo
//     var repoEl = document.createElement("a");
//     repoEl.classList = "list-item flex-row justify-space-between align-center";
//     repoEl.setAttribute("href", "./single-repo.html");


//     // create a span element to hold repository name
//     var titleEl = document.createElement("span");
//     titleEl.textContent = repoName;

//     // append to container
//     repoEl.appendChild(titleEl);

//     // create a status element
//     var statusEl = document.createElement("span");
//     statusEl.classList = "flex-row align-center";

//     // check if current repo has issues or not
//     if (repos[i].open_issues_count > 0) {
//       statusEl.innerHTML =
//         "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
//     } else {
//       statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
//     }

//     // append to container
//     repoEl.appendChild(statusEl);

//     // append container to the dom
//     repoContainerEl.appendChild(repoEl);
//   }
// };

// add event listeners to forms
userFormEl.addEventListener("submit", formSubmitHandler);