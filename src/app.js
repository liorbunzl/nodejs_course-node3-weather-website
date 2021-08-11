const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express()
const port = process.env.PORT || 3000


// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "..", "public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('/about', (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Lior",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: 'Lior',
    subtitle: "This is the help page",
  });
});

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Lior'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
      return res.send({
        error: "You must provide an address!",
      });
    }

    console.log('requested forecast for address: ' + req.query.address)

    geocode(req.query.address, (error, {latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        } 
        forecast(latitude, longitude, (error, {temperature, feelsLike} = {}) => {
            if (error) {
                res.send( error );
            } else {
                res.send({
                    requested_address: req.query.address,
                    latitude: latitude,
                    longitude: longitude,
                    location: location,
                    temperature: temperature,
                    feelsLike: feelsLike
                });
            }
        });
            
      });

    
})

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Help",
    name: "Lior",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render('404', {
      title: '404',
      name: 'Lior',
      errorMessage: 'Page not found'
  })
});

app.listen(port, () => {
    console.log('Server is up on port 3000')
})