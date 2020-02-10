/*********************************************************************************
* WEB322 – Assignment 03
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students. *
* Name: Zhaoxi Li Student ID: 117110189 Date: 12-Feb-2020 *
* Online (Heroku) Link: ________________________________________________________
* ********************************************************************************/

var express = require("express");
var app = express();
var HTTP_PORT = process.env.PORT || 8080;
var path = require("path");
var dataServer = require('./data-server.js');
var multer = require("multer");
var storage = multer.diskStorage({
    destination: "./public/pictures/uploaded",
    filename: function (req, file, cb) {
        cb(null, Date.now()+path.extname(file.originalname))
    }
  })
var upload = multer({storage: storage})
var fs = require("fs")
var bodyParser = require("body-parser")

function onHttpStart() 
{
    console.log("Express http server listening on: " + HTTP_PORT);
};

app.use(bodyParser.urlencoded({ extended: true }))
app.get("/", function(req,res)
{
   res.sendFile(path.join(__dirname + "/views/home.html"));
});
  
app.get("/about", function(req,res)
{
    res.sendFile(path.join(__dirname + "/views/about.html"));
});

app.get("/people/add", function(req,res)
{
    res.sendFile(path.join(__dirname + "/views/addPeople.html"));
});

app.get("/images/add", function(req,res)
{
    res.sendFile(path.join(__dirname + "/views/addImage.html"));
});

app.get("/cars", function(req,res){
    const vin = req.query.vin;
    const make = req.query.make;
    const year = req.query.year;
    if(vin){
        dataServer.getCarsByVin(vin).then((data)=>{
            console.log("get cars by vin ", vin)
            res.json(data);
        }).catch(err=> console.log(err))
    }else if(make){
        dataServer.getCarsByMake(make).then((data)=>{
            console.log("get cars by make ", make)
            res.json(data);
        }).catch(err=> console.log(err))
    }else if(year){
        dataServer.getCarsByYear(year).then((data)=>{
            console.log("get cars by year ", year)
            res.json(data);
        }).catch(err=> console.log(err))
    }else{
        dataServer.getCars().then((data)=>{
            console.log("get cars")
            res.json(data);
        }).catch(err=> console.log(err))
    }
});

app.get("/people", function(req,res){
    const vin = req.query.vin
    if(vin){
        dataServer.getPeopleByVin(vin).then((data)=>{
            console.log("get people with vin", vin)
            res.json(data);
        }).catch(err=> console.log(err))   
    }else{
      dataServer.getAllPeople(vin).then((data)=>{
        console.log("get people")
        res.json(data);
    }).catch(err=> console.log(err))   
    }
});

app.get("/person/:value", (req,res)=>{
    const id = req.params.value;
    dataServer.getPeopleById(id).then((data)=>{
        console.log("get people with id ", id)
        res.json(data);
    }).catch(err=> console.log(err))   
})

app.get("/stores", function(req,res){
    dataServer.getStores().then((data)=>{
        console.log("get stores")
        res.json(data);
    }).catch(err=> console.log(err))
});

app.get("/pictures",(req,res)=>{
    fs.readdir("./public/pictures/uploaded", function(err, files){
        const images = {"images":files}
        res.json(images)
    })
})

app.post("/pictures/add", upload.single("pictureFile"),(req,res)=>{
    //redirect to /pictures
    res.redirect("/pictures")
})

app.use(function (req, res, next) {
    res.status(404).send("Sorry you are getting the 404, and we cannot offer any help.")
  })

app.use(express.static('public'));

dataServer.initialize().then( ()=>{
    app.listen(HTTP_PORT, onHttpStart);
}).catch(err => console.log(err))