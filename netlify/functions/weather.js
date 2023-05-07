import fetch from "node-fetch";
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

exports.handler = async (event) => {
  const lat = event.queryStringParameters.lat;
  const lon = event.queryStringParameters.lon;
  const lang = event.queryStringParameters.lang;

  // console.log(lat, lon, lang)
  const WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&lang=${lang}`;

  const response = await fetch(WEATHER_API);
  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
