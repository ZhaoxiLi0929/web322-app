const Sequelize = require('sequelize')

var sequelize = new Sequelize('dcqn47389ttdhc', 'xfzgkhyykhunvb', 'e00d3482c322346a5f5b5339a513355d68f193caa75bdd879e205dbab4469abf', {
    host: 'ec2-35-172-85-250.compute-1.amazonaws.com',
    dialect: 'postgres',
    dialectOptions: {
        ssl: true
    }
})

var People = sequelize.define('People', {
    first_name: Sequelize.STRING,  
    last_name: Sequelize.STRING, 
    phone: Sequelize.STRING, 
    address: Sequelize.STRING, 
    city: Sequelize.STRING 
});

var Car = sequelize.define('Car', {
    vin: {
        type:Sequelize.STRING,
        unique: true,
        primaryKey: true,
    }, 
    make: Sequelize.STRING, 
    model: Sequelize.STRING, 
    year: Sequelize.STRING, 
});

var Store = sequelize.define('Store', {
    retailer: Sequelize.STRING,  
    phone: Sequelize.STRING, 
    address: Sequelize.STRING, 
    city: Sequelize.STRING 
});

Car.hasMany(People, {foreignKey: 'vin'}); 

module.exports.initialize = () =>{
    return new Promise( (resolve,reject) => {
        sequelize.sync()
        .then(()=> resolve())
        .catch(() => reject("unable to sync the database"))
    })
}

module.exports.getAllPeople = () =>{
    return new Promise ((resolve, reject)=>{
       People.findAll()
       .then((allPeople)=>resolve(allPeople))
       .catch(()=>reject('cannot find people'))
    })
}

module.exports.addPeople = (peopleData) => {
    return new Promise ((resolve, reject) => {
        for (let property in peopleData){
            if(property == '') property = null
        }
            People.create(peopleData)
            .then(() => resolve(`successfully created new peoson`))
            .catch(() => reject('failed to create new person'))
    })
}

module.exports.getPeopleById=(id)=>{
    return new Promise ((resolve, reject)=>{
        People.findAll()
        .then((allPeople)=>{
            const filteredPeople = allPeople.filter(person => person.id == id)
            if(filteredPeople.length){
                resolve(filteredPeople)
            }else(
                reject(`No person found with id:${id}`)
            )
        })
        .catch(()=>reject(`cannot find people`))
    })
}

module.exports.getPeopleByVin=(vin)=>{
    return new Promise ((resolve, reject)=>{
        People.findAll()
        .then((allPeople)=>{
            const filteredPeople = allPeople.filter(person => person.vin == vin)
            if(filteredPeople.length){
                resolve(filteredPeople)
            }else(
                reject(`No person found with vin:${vin}`)
            )
        })
        .catch(()=>reject(`cannot find people`))
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
        Car.findAll()
       .then((allCars)=>{
           resolve(allCars)
       })
       .catch(()=>reject('cannot find cars'))
    })
}

module.exports.getCarsByVin=(vin)=>{
    return new Promise ((resolve, reject)=>{
        Car.findAll()
        .then((allCars)=>{
            const filteredCar = allCars.filter(car => car.vin == vin)
            if(filteredCar.length){
                resolve(filteredCar)
            }else(
                reject(`No car found with vin:${vin}`)
            )
        })
        .catch(()=>reject(`cannot find cars`))
    })
}

module.exports.getCarsByMake=(make)=>{
    return new Promise ((resolve, reject)=>{
        Car.findAll()
        .then((allCars)=>{
            const filteredCar = allCars.filter(car => car.make == make)
            if(filteredCar.length){
                resolve(filteredCar)
            }else(
                reject(`No car found with make:${make}`)
            )
        })
        .catch(()=>reject(`cannot find cars`))
    })
}

module.exports.getCarsByYear=(year)=>{
    return new Promise ((resolve, reject)=>{
        Car.findAll()
        .then((allCars)=>{
            const filteredCar = allCars.filter(car => car.year == year)
            if(filteredCar.length){
                resolve(filteredCar)
            }else(
                reject(`No car found in ${year}`)
            )
        })
        .catch(()=>reject(`cannot find cars`))
    })
}

module.exports.addCars = (CarData) => {
    return new Promise ((resolve, reject) => {
        console.log("Car data", CarData)
        for (let property in CarData){
            if(property == '') property = null
        }
            Car.create(CarData)
            .then(() => resolve(`successfully created a new car`))
            .catch(() => reject('failed to create a new car'))
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
        Store.findAll()
       .then((allStores)=>resolve(allStores))
       .catch(()=>reject('cannot find stores'))
    })
}

module.exports.getStoresByRetailer = (value) =>{
    return new Promise ((resolve, reject)=>{
        Store.findAll()
        .then((allStores)=>{
            const filteredStore = allStores.filter(store => store.retailer == value)
            if(filteredStore.length){
                resolve(filteredStore)
            }else(
                reject(`No stores found with retailer: ${value}`)
            )
        })
        .catch(()=>reject(`cannot find stores`))
    })
}

module.exports.updatePerson = (data) => {
    return new Promise((resolve, reject)=>{
        for (let property in data){
            if(property == '') property = null
        }
            People.update(data, {
                where:{id:data.id}
            })
            .then(() => resolve(`successfully updated person`))
            .catch(() => reject('failed to updated person'))
    })
}

module.exports.updateCar = (data) => {
    return new Promise((resolve, reject)=>{
        for (let property in data){
            if(property == '') property = null
        }
            Car.update(data, {where: 
                {vin:data.vin}})
            .then(() => resolve(`successfully updated car with vin: ${data.vin}`))
            .catch(() => reject('failed to updated car'))
    })
}

module.exports.deleteCarByVin = (vin) => {
    return new Promise((resolve, reject) => {
        Car.destroy({where: {vin: vin}})
        .then(()=> resolve(`successfully delete car with vin: ${vin}`))
        .catch((err) => reject(`failed to deleted the car`))
    })
}

module.exports.deletePeopleById = (id) => {
    return new Promise((resolve, reject) => {
        People.destroy({where: {id: id}})
        .then(()=> resolve(`successfully delete person with id: ${id}`))
        .catch((err) => reject(`failed to deleted the person`))
    })
}

module.exports.deleteStoreById = (id) => {
    return new Promise((resolve, reject) => {
        Store.destroy({where: {id: id}})
        .then(()=> resolve(`successfully delete store with id: ${id}`))
        .catch((err) => reject(`failed to deleted the store`))
    })
}

module.exports.addStore = (storeData) => {
    return new Promise ((resolve, reject) => {
        for (let property in storeData){
            if(property == '') property = null
        }
            Store.create(storeData)
            .then(() => resolve(`successfully created new store`))
            .catch(() => reject('failed to create new store'))
    })
}