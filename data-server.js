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

module.exports.getPeopleById=(id)=>{
    return new Promise ((resolve, reject)=>{
        if (people.length != 0){
            console.log(id)
            const person = people.filter(person=>person.id == id)[0]
            resolve(person)
        }else{
            reject({message: "people array is empty"})
        }
    })
}

module.exports.getPeopleByVin=(vin)=>{
    return new Promise ((resolve, reject)=>{
        if (people.length != 0){
            resolve(people.filter(person=>person.vin === vin))
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

module.exports.getCarsByVin=(vin)=>{
    return new Promise ((resolve, reject)=>{
        if (people.length != 0){
            resolve(cars.filter(car=>car.vin === vin))
        }else{
            reject({message: "cars array is empty"})
        }
    })
}

module.exports.getCarsByMake=(make)=>{
    return new Promise ((resolve, reject)=>{
        if (people.length != 0){
            resolve(cars.filter(car=>car.make === make))
        }else{
            reject({message: "cars array is empty"})
        }
    })
}

module.exports.getCarsByYear=(year)=>{
    return new Promise ((resolve, reject)=>{
        if (people.length != 0){
            resolve(cars.filter(car=>car.year == year))
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