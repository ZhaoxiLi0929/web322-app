/*********************************************************************************
* WEB322 – Assignment 02
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students. *
* Name: Zhaoxi Li Student ID: 117110189 Date: 29-Jan-2020 *
* Online (Heroku) Link: ________________________________________________________
* ********************************************************************************/

var express = require("express");
var app = express();
var HTTP_PORT = process.env.PORT || 8080;
var path = require("path");
var dataServer = require('./data-server.js');

function onHttpStart() 
{
    console.log("Express http server listening on: " + HTTP_PORT);
};

app.get("/", function(req,res)
{
   res.sendFile(path.join(__dirname + "/views/home.html"));
});
  
app.get("/about", function(req,res)
{
    res.sendFile(path.join(__dirname + "/views/about.html"));
});

app.get("/cars", function(req,res){
    dataServer.getCars().then((data)=>{
        console.log("get cars")
        res.json(data);
    }).catch(err=> console.log(err))
});

app.get("/people", function(req,res){
    dataServer.getAllPeople().then((data)=>{
        console.log("get people")
        res.json(data);
    }).catch(err=> console.log(err))
});

app.get("/stores", function(req,res){
    dataServer.getStores().then((data)=>{
        console.log("get stores")
        res.json(data);
    }).catch(err=> console.log(err))
});

app.use(function (req, res, next) {
    res.status(404).send("Sorry you are getting the 404, and we cannot offer any help.")
  })

app.use(express.static('public'));

dataServer.initialize().then( ()=>{
    app.listen(HTTP_PORT, onHttpStart);
}).catch(err => console.log(err))

