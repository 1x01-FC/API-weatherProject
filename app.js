const express = require('express');
const https = require('node:https');


const app = express();

app.use(express.urlencoded({ extended: true}));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

app.post('/', function(req,res){

  const query = req.body.cityName; //req because we req info from client
  const apiKey = 'dd6edf25424fac3446abe53d56c42587';
  const unit = 'metric'
  const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ query + '&units='+ unit + '&appid=' + apiKey

    https.get(url, function(response) {
      console.log(response.statusCode);

      response.on('data', function(data) {
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp
        const desc = weatherData.weather[0].description // array with 1 item, --> 0
        const icon = weatherData.weather[0].icon
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

        res.write('<p>The weather is currently ' + desc + '.<p>');
        res.write('<h1>The temperature in '+ query + ' is ' + temp + ' degrees Celcius</h1>');
        res.write('<img src=' + imageURL + '>');
        // res.send();

      });
    });
});



app.listen(3000, function() {
  console.log('Server running on port 3000');
});
