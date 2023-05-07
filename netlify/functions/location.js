import fetch from "node-fetch";

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
