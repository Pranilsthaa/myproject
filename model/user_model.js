const e = require('cors');
let {connection} = require('../connection/connection');


function registerUser(value, pass){
    const {name, address, phone, email} = value;

    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO user_detail (user_name, user_location, user_phone, email, password) VALUES (?, ?, ?, ?, ?)', [name, address, phone, email, pass],
        (error, result) => {
            if(error){
                return reject(error);
            }
            else{
                return resolve(result);
                
            }
        })
    })
}


function getUserDetail(){
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM user_detail',
        (error, result) => {
            if(error){
                return reject(error);
            }
            else{
                return resolve(result);
                
            }
        })
    })
}



module.exports = {
    registerUser,
    getUserDetail
}
