const axios = require("axios");

geocodeToken =
  "access_token=pk.eyJ1IjoibXh0cmFkZXIiLCJhIjoiY2t6dmlhdHQ3N3d0djJ3bmtkaW0yaXh0eSJ9.TPezXMfGBisLS8ddurtgXA";

const geocode = (nombre, callback) => {
  geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${nombre}.json?${geocodeToken}`;
  axios
    .get(geocodeUrl)
    .then((res) => {
      if (!res.data.features.length) {
        callback({
          code: 801,
          error: "No se encuentra ese lugar",
        });
      } else {
        callback(undefined, {
          nombre: res.data.features[0].place_name,
          lon: res.data.features[0].center[0],
          lat: res.data.features[0].center[1],
        });
      }
    })
    .catch((err) => {
      callback({
        code: 802,
        error: "No se pudo conectar a la fuente" + err,
      });
    });
};

module.exports = geocode;
