const request = require('request');

const geocode = (address, callback) => {
  const token =
    "pk.eyJ1IjoibGlvcmJ1bnpsIiwiYSI6ImNrczJ4Z2ZueTBoeHAybnBmZGtpaWNlMngifQ.ppafBNlQLVdWd16RqpZU1A";
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=" +
    token +
    "&limit=1";

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to mapbox service", undefined);
    } else if (body.error) {
      errMessage = "Unable to process request:\n" + body.error;
      callback(errMessage, undefined);
    } else if (body.features.length < 1) {
      callback("location undefined", undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode