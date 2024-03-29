const path = require('path'); 
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '..', 'public');
const viewPath = path.join(__dirname, '..', 'templates', 'views');
const partialsPath = path.join(__dirname, '..', 'templates', 'partials');
hbs.registerPartials(partialsPath);

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Taki Ishimura'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Me',
        name : 'Taki Ishimura'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        message : 'This is the help page!',
        title : 'Help Page',
        name : 'Taki Ishimura'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error : 'You must provide an address' });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast : forecastData,
                location : location,
                address : req.query.address
            });
        });
    });
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error : 'You must provide a search term'
        });
    }
    console.log(req.query);
    res.send({
        products : []
    });
})

app.get('/help/*', (req, res) => {
    res.render('errorpage', {
        title : '404',
        errorMessage : 'Help article not found.',
        name : 'Taki Ishimura'
    });
})

app.get('*', (req, res) => {
    res.render('errorpage', {
        title : '404', 
        errorMessage : 'Page not found', 
        name : 'Taki Ishimura'
    });
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});