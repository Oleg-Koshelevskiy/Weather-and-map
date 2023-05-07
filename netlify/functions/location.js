import fetch from "node-fetch";
// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// app.use(cors());

exports.handler = async (event) => {
  const cityName = event.queryStringParameters.city || "london";
  console.log(cityName);
  const CITY_API = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;

  const response = await fetch(CITY_API);
  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
