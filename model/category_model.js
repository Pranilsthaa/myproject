let {connection} = require('../connection/connection');

function getCategory(){
    return new Promise((resolve, reject) =>{
        connection.query('SELECT * FROM category_info', (error, result)=> {
            if(error) {
                return reject(error);
            }
            else{
               return resolve(result) 
            }
        })
    } )
}

function getCategoryID(id){
    return new Promise((resolve, reject) =>{
        connection.query('SELECT * FROM category_info where id= ?', [id] , (error, result)=> {
            if(error) {
                return reject(error);
            }
            else{
               return resolve(result) 
            }
        })
    } )
}


function addCategory(data){
    const {category_name} = data;
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO category_info (c_name) VALUES (?)', [category_name],
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

function updateCategory(id, category_name){
   
    return new Promise((resolve, reject) => {
        connection.query('UPDATE category_info SET c_name= ? where id= ?', [category_name, id],
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


function deleteCategory(id){
   
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM category_info where id= ?', [id],
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
    getCategory,
    addCategory,
    getCategoryID,
    updateCategory,
    deleteCategory
}