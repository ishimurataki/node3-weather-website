const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/ad7027b8ef1cbd936f90b3b04d7369fb/' + latitude + ',' + longitude;
    request({url, json : true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined);
        } else if (body.error) {
            callback('Unable to find location!', undefined);
        } else {
            callback(undefined, {
                summary : body.daily.data[0].summary,
                temperature : body.currently.temperature,
                precipProbability : body.currently.precipProbability
            })
        }
    });
}

module.exports = forecast;