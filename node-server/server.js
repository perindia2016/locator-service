'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var redis = require("redis");
var fs = require("fs");
//var client = redis.createClient();
var client = redis.createClient('6379', 'redis');
var app = express();


app.use(bodyParser.json());

var baseUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=";
//var apiKey = "AIzaSyBXcmHjj5zrDthj9kU04QeiwOM8iPqgDnU";
var apiKey = "AIzaSyAaW4j9GRMTiaLliOduIj6sz73jHxihH2U";

app.get('/locator', function (req, res) {
    var lat = req.query.lat;
    var long = req.query.long;
    var dist = req.query.distance;
    var entity_type = req.query.entity;

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

    processRequest('restaurant', long, lat, dist, 0, res);
    
    
});

function processRequest(type, long, lat, dist, isFirstTime, res){
    client.georadius('restarants', long, lat, dist,'m', 'WITHDIST', 'ASC', function(err, result){
        console.log(result);
        

        //No result and if its first time
        if (result.length == 0 && isFirstTime == 0){
            console.log("***** No restarants -- Reading data ********");    
            var url = baseUrl + lat + "," + long + "&radius=" + dist + "&type=" + type + "&key=" + apiKey;
            console.log("URL is : " + url);
            //readData(processRequest(type, long, lat, dist, 1, res));
            readLiveData(processRequest(type, long, lat, dist, 1, res), url);
        } else {
            // Process the result
            console.log("***** No of restarants:" + result.length); 
            if(result.length == 0){
                res.setHeader('Content-Type', 'application/json');
                res.end('[]');
            } else {
                processResult(result, res); 
            }
            
        }
        
    });
}

function processResult(result, res){
    var i;
    var status = 0;
    var restarants = [];
    for(i=0; i <result.length; i++){
        var id = result[i][0];
        var distance = result[i][1];
        console.log("Id: " + id + " distance: " + distance);
        
        parseRow(id, restarants, function(object, restarants){
            status++;
            //console.log(object);
            restarants.push(object);
            if(status == result.length){
                //console.log(JSON.stringify(restarants));
                sendResponse(res, restarants);
            }
        })
    }
}

function parseRow(id, restarants, callback){
    client.hgetall(id, function(err, object){
        if(callback){
            callback(object, restarants);
        }
    });
}

function sendResponse(res, results){
    var outputJson = "[";
    var i;
    for(i=0; i< results.length; i++) {
        var outputJson1 = "{";
        outputJson1 += "\"id\":" + JSON.stringify(results[i].id) + ",";
        outputJson1 += "\"name\":" + JSON.stringify(results[i].name) + ",";
        outputJson1 += "\"lat\":" + JSON.stringify(parseFloat(results[i].lat)) + ",";
        outputJson1 += "\"lng\":" + JSON.stringify(parseFloat(results[i].long)) + ",";
        outputJson1 += "\"icon\":" + JSON.stringify(results[i].icon);
        outputJson1 += "}";
        outputJson += outputJson1+",";
    }
    outputJson = outputJson.substring(0,(outputJson.length -1));
    outputJson += "]";
    console.log("Final output JSON **********")
    console.log(outputJson);
    res.setHeader('Content-Type', 'application/json');
    res.end(outputJson);
}

function readData(callback){
    fs.readFile( __dirname + "/" + "output.json", 'utf8', function(err,data){
    data = JSON.parse(data);
    if(data["status"] == "OK") {
        var results = data["results"];
        var i;
        for(i=0; i< results.length; i++) {
            
            var aTest = { "name" : results[i].name, "id" : results[i].id, "lat": results[i].geometry.location.lat, "long": results[i].geometry.location.lng, "icon" : results[i].icon}  
            
            client.hmset("restarants_" + results[i].id, aTest);
            client.geoadd('restarants', results[i].geometry.location.lng, results[i].geometry.location.lat, "restarants_" + results[i].id);
            
            console.log("Set entry with id:" + "restarants_" + results[i].id);
        }
    }
    if(callback){
        callback(); 
    }
    });
}

function readLiveData(callback, url){
    
    request(url, function(error, response, body, callback) {
    if (error) {
      console.log('Error:', error);
    } else if (response.statusCode !== 200) {
      console.log('Status:', response.statusCode);
    } else {
        var data = JSON.parse(body);
        console.log("Body : " + data);
        if(data["status"] == "OK") {
            var results = data["results"];
            var i;
            for(i=0; i< results.length; i++) {
                
                var aTest = { "name" : results[i].name, "id" : results[i].id, "lat": results[i].geometry.location.lat, "long": results[i].geometry.location.lng, "icon" : results[i].icon}  
                
                client.hmset("restarants_" + results[i].id, aTest);
                client.geoadd('restarants', results[i].geometry.location.lng, results[i].geometry.location.lat, "restarants_" + results[i].id);
                
                console.log("Set entry with id:" + "restarants_" + results[i].id);
            }
        }
        if(callback){
            callback(); 
        }   
    }
});
}

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


var server = app.listen(8090, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Locator Service listening at http://%s:%s", host, port)
})

