const fs = require('fs');
let cars = [];
let people = [];
let stores = [];

module.exports.initialize = () =>{
    return new Promise( (resolve,reject) => {
        fs.readFile("./data/people.json","utf8", (err, data) =>{
            if(err){
                reject({message:err})
            }else{
                people = JSON.parse(data)
                fs.readFile("./data/cars.json","utf8", (err, data) => {
                    if(err){
                        reject({message:err})
                    }else{
                        cars = JSON.parse(data)
                        fs.readFile("./data/stores.json","utf8", (err, data) => {
                            if(err){
                                reject({message:err})
                            }else{
                                stores = JSON.parse(data);
                                resolve("200")
                            }
                        })
                    }
                })
            }
        })
    })
}

module.exports.getAllPeople = () =>{
    return new Promise ((resolve, reject)=>{
        if (people.length != 0){
            resolve(people)
        }else{
            reject({message: "people array is empty"})
        }
    })
}

module.exports.getCars = () =>{
    return new Promise ((resolve, reject)=>{
        if (people.length != 0){
            resolve(cars)
        }else{
            reject({message: "cars array is empty"})
        }
    })
}

module.exports.getStores = () =>{
    return new Promise ((resolve, reject)=>{
        if (people.length != 0){
            resolve(stores)
        }else{
            reject({message: "stores array is empty"})
        }
    })
}
