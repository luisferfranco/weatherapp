const axios = require("axios");

const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=3990913bde9425e71115a883b91a06cd&units=m&query=${lat},${lon}`;
  axios
    .get(url)
    .then((res) => {
      if (res.status == 200) {
        const location = res.data.location.name;
        const country = res.data.location.country;

        const data = res.data.current;

        callback(undefined, {
          location: `${location}, ${country}`,
          temperature: data.temperature,
          precipitation: data.precip,
        });
      } else {
        data = res.data;
        callback({
          code: 2,
          error: `API Error ${data.error.code} ${data.error.info}`,
        });
      }
    })
    .catch((err) => {
      callback({
        code: 1,
        error: "Error en la conexión",
      });
    });
};

module.exports = forecast;
