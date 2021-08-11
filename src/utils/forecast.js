const request = require("request");
const forecast = (latitude, longitude, callback) => {
    const api_access_key = "cb19e3175434dcab1774dceaa99d370e";
    const url =
    "http://api.weatherstack.com/current?access_key=" +
    api_access_key +
    "&query=" + latitude + "," + longitude
    request({ url , json:true }, (error, { body } ) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error){
            message = 'Unable to process request:\n' + 
            body.error.info
            callback(message,undefined)
        } else {
            message = "It is currently " +
            body.current.weather_descriptions[0] +
            " at " +
            body.location.name +
            "\nTemperature is " +
            body.current.temperature +
            ", feels like " +
            body.current.feelslike

            callback(undefined,{
                'location': body.location.name,
                'temperature': body.current.temperature,
                'feelsLike': body.current.feelslike
            })
        }
    })
};
module.exports = forecast;
