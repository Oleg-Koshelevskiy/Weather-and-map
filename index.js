// const PORT = 8000;
// const express = require("express");
// const cors = require("cors");
// const axios = require("axios");
// const rateLimit = require("express-rate-limit");
// const apicache = require("apicache");
// require("dotenv").config();

// const app = express();

// const limiter = rateLimit({
//   windowMs: 10 * 60 * 1000, // 10 mins
//   max: 20,
// });

// let cache = apicache.middleware;

// app.use(limiter);
// app.set("trust proxy", 1);

// app.use(express.static("public"));

// app.use(cors());

// app.get("/", (req, res) => {
//   res.json("Hello from server!");
// });

// app.get("/location", cache("10 minutes"), (req, res) => {
//   const cityName = req.query.city;
//   console.log(cityName);

//   const options = {
//     method: "GET",
//     url: `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${process.env.REACT_APP_WEATHER_API_KEY}`,
//   };

//   axios
//     .request(options)
//     .then((response) => {
//       res.json(response.data);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// });

// app.get("/weather", cache("10 minutes"), (req, res) => {
//   const lat = req.query.lat;
//   const lon = req.query.lon;
//   const lang = req.query.lang;

//   console.log(lat, lon, lang);

//   const options = {
//     method: "GET",
//     url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&lang=${lang}`,
//   };

//   axios
//     .request(options)
//     .then((response) => {
//       res.json(response.data);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// });

// app.get("/forecast", (req, res) => {
//   const lat = req.query.lat;
//   const lon = req.query.lon;
//   const lang = req.query.lang;

//   console.log(lat, lon, lang);

//   const options = {
//     method: "GET",
//     url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&lang=${lang}`,
//   };

//   axios
//     .request(options)
//     .then((response) => {
//       res.json(response.data);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// });

// app.listen(8000, () => console.log(`Server is running on port ${PORT}`));
