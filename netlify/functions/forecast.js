exports.handler = async (event) => {  
    
    const lat = event.queryStringParameters.lat;
    const lon = event.queryStringParameters.lon;
    const lang = event.queryStringParameters.lang;
    
    console.log(lat, lon, lang)
    const FORECAST_API = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&lang=${lang}`

    const response = await fetch(FORECAST_API)
    const data = await response.json()
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}
