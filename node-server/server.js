'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();
var clientapp = express();
var fs = require("fs");

app.use(bodyParser.json());

var baseUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=";
var apiKey = "AIzaSyBXcmHjj5zrDthj9kU04QeiwOM8iPqgDnU";

app.get('/locator', function (req, res) {
    var lat = req.query.lat;
    var long = req.query.long;
    var dist = req.query.distance;
    var entity_type = req.query.entity;

    /*app.post('/locator', function (req, res) {
     var lat = req.body.lat;
     var long = req.body.long;
     var dist = req.body.distance;
     var entity_type = req.body.entity_type;*/

    var url = baseUrl + lat + "," + long + "&radius=" + dist + "&type=" + entity_type + "&key=" + apiKey;
    console.log("URL is : " + url);

    /*request(url, function(error, res,body) {
     if (error) {
     console.log('Error:', error);
     } else if (res.statusCode !== 200) {
     console.log('Status:', res.statusCode);
     } else {
     body = JSON.parse(body);
     console.log("Body : " + body);
     }	
     });
     
     res.send(req.body);*/

    fs.readFile(__dirname + "/" + "output.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        if (data["status"] == "OK") {
            var results = data["results"];
            var i;
            var outputJson = "[";
            for (i = 0; i < results.length; i++) {
                outputJson += "{";
                outputJson += "\"name\":" + JSON.stringify(results[i].name) + ",";
                outputJson += "\"lat\":" + JSON.stringify(results[i].geometry.location.lat) + ",";
                outputJson += "\"lng\":" + JSON.stringify(results[i].geometry.location.lng) + ",";
                outputJson += "\"icon\":" + JSON.stringify(results[i].icon);
                outputJson += "},";
            }
            outputJson = outputJson.substring(0, (outputJson.length - 1));
            outputJson += "]";
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(outputJson);
    });

})

app.get('/locatorui', function (req, res) {
    var lat = req.query.lat;
    var long = req.query.long;
    var dist = req.query.distance;
    var entity_type = req.query.entity_type;
    var zoom = 20;

    var url = baseUrl + lat + "," + long + "&radius=" + dist + "&type=" + entity_type + "&key=" + apiKey;
    console.log("URL is : " + url);
    res.render("locator.ejs", {layout: false, lat: lat, lon: long, zoom: zoom});
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Locator Service listening at http://%s:%s", host, port)
})
