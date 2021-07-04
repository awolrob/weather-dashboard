# CWRU Cooding Bootcamp 6. Server-Side APIs: Weather Dashboard

## PURPOSE: Build a weather dashboard for travelers that will run in the browser and to display weather at selected citys.

** **
Open [index.html](./index.html) in your browser to view the updated landing page.
   - Source: [Github](https://github.com/awolrob/weather-dashboard)
   - Published Site: [Live URL](https://awolrob.github.io/weather-dashboard/)
** **

I will use the [OpenWeather One Call API](https://openweathermap.org/api/one-call-api) to retrieve weather data for cities. Read through the documentation for setup and usage instructions. I will use `localStorage` to store any persistent data.

## A traveler I WANT to see the weather outlook for multiple cities SO THAT I can plan a trip accordingly
** **
## Acceptance Criteria is as follows:

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

```
REF: CWRU Module 6 git it done was used as the base code for this assignment
```
```
REF: https://www.w3resource.com/javascript-exercises/javascript-date-exercise-17.php
```
```
REF: https://coderrocketfuel.com/article/convert-a-unix-timestamp-to-a-date-in-vanilla-javascript
```
```
REF: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
```
```
REF: https://www.epa.gov/sites/production/files/documents/uviguide.pdf
```

**The application should function as follows:**
![weather dashboard demo](./assets/images/06-server-side-apis-homework-demo.png)

- - -
` https://github.com/awolrob | 2021-06-19 `