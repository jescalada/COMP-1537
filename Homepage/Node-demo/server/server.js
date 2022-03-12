const express = require('express');
const app = express();
const collection = require('./data.js'); // file must be exported
const validKeys = require('./valid-keys.js');

app.listen(5000, function (err) {
    if (err) console.log(err);
});


// app.get('/', function (req, res) { //app.get callback takes a request and a response, meanwhile function itself takes a route
//     res.send('GET request to homepage')
// })

app.get('/contact', function (req, res) {
    res.send('Hi there, here is my <a href="mailto:jescalada@my.bcit.ca">email</a>.')
});

// app.get('/', function (req, res) {
//     res.write(`Weather of ${req.query["q"]} is 4.8 Celsius. `);
//     res.write(`Your API key is ${req.query["appkey"]}. `);
//     res.send();
// });


// We retrieve data from data.js (collection variable)
app.get('/', function (req, res) {
    console.log(collection["cities"])
   res.json(collection["cities"].find(
       (city) => city.name == req.query["q"]
   ))
})

