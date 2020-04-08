const bcrypt = require("bcryptjs");

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userSchema = new Schema({
    "userName":  String,
    "password": String,
    "email": String,
    "loginHistory": [{
      "dateTime": Date,
      "userAgent": String
    }],
  });
  
  let User = mongoose.model('User', userSchema)
  //var Company = mongoose.model("web322_companies", companySchema);

  module.exports.initialize = function () {
    return new Promise(function (resolve, reject) {
        let db = mongoose.createConnection("mongodb+srv://dbzli266:db3311lzx@web322-krzai.mongodb.net/A6?retryWrites=true&w=majority");
        db.on('error', (err)=>{
            reject(err); // reject the promise with the provided error
        });
        db.once('open', ()=>{
            User = db.model("users", userSchema);
        resolve();
        });
    });
   }; 

   module.exports.registerUser = function(userData){
       return new Promise((resolve, reject)=>{
           if(userData.password !== userData.password2){
             reject('Passwords do not match')
           }else{
                bcrypt.genSalt(10, function(err, salt){
                // generate a "salt" using 10 rounds
                    bcrypt.hash(userData.password, salt, function(err, hash){
                        if(err){
                            reject('There was an error encrypting the password');
                        }
                        else {
                            userData.password = hash;
                            let newUser = new User(userData)
                            newUser.save((err)=>{
                                if(err){
                                    if(err.code == 11000){
                                        reject('User Name already taken')
                                    }else{
                                        reject(`There was an error creating the use: ${err}`)
                                    }
                                }else{
                                    resolve()
                                }
                            })
                        }
                    })
                })
           }
       })
   }

   module.exports.checkUser = (userData)=> {
       return new Promise((resolve, reject)=> {
           User.find({userName: userData.userName})
           .exec()
           .then((users)=>{
               if(!users){
                   reject(`Unable to find user: ${userData.userName}`)
               }else{
                bcrypt.compare(userData.password, users[0].password).then((res)=>{
                    if(res===true){
                        users[0].loginHistory.push({dateTime: (new Date()).toString(), userAgent: userData.userAgent});
                        User.update(
                            { userName: users[0].userName },
                            { $set: {loginHistory: users[0].loginHistory }},
                            { multi: false }
                        ).exec().then((() => {
                            resolve(users[0]);
                        })).catch((err) => {
                            reject("There was an error verifying the user: " + err);
                        });
                    }else{
                        reject('Incorrect Password for user: '+userData.userName);
                    }
                })
               }
           }).catch(err => {
               console.log(err)
               reject(`Unable to find user: ${userData.userName}`)
           })
       })
   }