const path = require("path");
const express = require("express");
const hbs = require("hbs");
const chalk = require("chalk");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup Express
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Luis Franco",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Acerca de...",
    name: "Luis Franco",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Se debe proveer un dirección",
      code: 901,
    });
  }

  geocode(req.query.address, (error, { lon, lat } = {}) => {
    if (error) {
      return res.send(error);
    }

    if (!error) {
      forecast(lat, lon, (error, { location, temperature, precipitation }) => {
        console.log(location, temperature, precipitation);

        if (error) {
          return res.send({
            error: "Error en el API " + error,
            code: 902,
          });
        }

        return res.send({
          location: location,
          temperature: temperature,
          precipitation: precipitation,
        });
      });
    } else {
      return res.send("Dios es una mierda");
    }
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  res.send({
    products: [],
  });
});

app.get("/help", (req, res) =>
  res.render("help", {
    title: "help page",
    message: "Mensaje de Ayuda",
    name: "Luis Franco",
  })
);

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Tópico desconocido",
    message: "El tópico que buscas no existe",
    name: "Luis Franco",
  });
});

// Captura todas las URL que no se hayan capturado antes
app.get("*", (req, res) => {
  res.render("404", {
    title: "404 No existe el recurso",
    message: "El recurso que buscas no existe",
    name: "Luis Franco",
  });
});

app.listen(port, () => {
  console.log("Server started correctly on " + port);
});
