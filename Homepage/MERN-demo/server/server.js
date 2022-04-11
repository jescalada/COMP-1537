const express = require('express');
const app = express();

// DEFINE MONGOOSE
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const citySchema = new mongoose.Schema({
    name: String,
    temperature: Number,
    description: String
});
const cityModel = mongoose.model("cities", citySchema);

// body-parser required for parsing post responses
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({
    extended: true
}));

app.listen(5000, function (err) {
    if (err) console.log(err);
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.get('/contact', function (req, res) {
    res.send('Welcome, traveler! Send me some <a href="mailto:jescalada@my.bcit.ca">mail</a> if you have any inquiries.')
})

const https = require('https');

app.post("/weather", function (req, res) {
    // res.send("post req received" + req.body.cityName);
    var apikey = "a35e169d3416373244a7aae233af3555";
    console.log(req.body.cityName);
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + req.body.cityName + "&units=metric&appid=" + apikey

    https.get(url, function (https_res) {
        https_res.on("data", function (data) {
            res.write("<h1> " + req.body.cityName + " weather is " + JSON.parse(data).weather[0].description) + "</h1>";
            res.write("<h1> " + req.body.cityName + " temp is " + JSON.parse(data).main.temp) + "</h1>";

            // console.log(JSON.parse(data).weather[0].icon );
            res.write('  <img src="' + "http://openweathermap.org/img/wn/" + JSON.parse(data).weather[0].icon + '.png"' + "/>");
            res.send();
        })
    });
})

app.get('/cities/:city_name', function (req, res) {
    console.log("received a request for " + req.params.city_name);
    cityModel.find({
        name: req.params.city_name
    }, function (err, cities) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + JSON.stringify(cities));
        }
        res.send(JSON.stringify(cities));
    });
})

app.get('/cities', function (req, res) {
    cityModel.find({}, function (err, cities) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + JSON.stringify(cities));
        }
        res.send(JSON.stringify(cities));
    });
})

app.post("/insert", function (req, res) {
    cityModel.create({
        name: req.body.name,
        temperature: req.body.temperature,
        description: req.body.description
    }, function (err, data) {
        if (err) console.log(err);
        else
            console.log(data);
        res.send(`Inserted ${req.body.name} into DB.`);
    });
})

app.post("/delete/:city_name", function (req, res) {
    cityModel.remove({
        name: req.body.name
    }, function (err, data) {
        if (err) console.log(err);
        else
            console.log(data);
            res.send(`Deleted ${req.body.name} from DB.`);
    });
})