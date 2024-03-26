let {connection} = require('../connection/connection');


function addProduct(data, imgSrc){
    const {product_name, product_des, product_price, category_id} = data;

    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO product_info (product_name, image, des, Price, Category_ID) VALUES (?, ?, ?, ?, ?)', [product_name, imgSrc, product_des, product_price, category_id],
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


function addProductWithoutImg(data){
    
    const{product_name, product_des, product_price, category_id} = data;
        return new Promise((resolve, reject)=>{
            connection.query('INSERT INTO product_info (product_name, des, Price, Category_ID) VALUES (?, ?, ?, ?)', [product_name, product_des, product_price, category_id],
            (error, result) => {
                if(error){
                    return reject(error)
                }
                else{
                    return resolve(result)
                }
            })
        })
}

function getProduct(){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT product_info.id, product_info.product_name, product_info.image, product_info.des, product_info.Price, product_info.Category_ID,
        category_info.c_name
        FROM product_info
        INNER JOIN category_info ON product_info.Category_ID = category_info.id`,

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

function delProduct(id){
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM product_info where id= ?',[id],

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

function getImageURL(id){
    return new Promise((resolve, reject)=>{
        connection.query('SELECT image FROM product_info where id=?', [id],
        (error, result) => {
            if(error){
                return reject(error);
            }
            else{
                return resolve(result)
            }
        })
    })
}

function getProductFromID(id){
    return new Promise((resolve, reject) =>{
        connection.query('SELECT * FROM product_info where id= ?', [id] , (error, result)=> {
            if(error) {
                return reject(error);
            }
            else{
               return resolve(result) 
            }
        })
    } )
}

function getProductFromCID(id){                                                       // FOR USER PRODUCT-GRID
    return new Promise((resolve, reject) =>{
        connection.query('SELECT * FROM product_info where Category_ID= ?', [id], 
        (error, result) => {
            if(error) {
                return reject(error);
            }
            else{
                console.log(result);
               return resolve(result) 
            }
        })
    } )
}



function updateProduct(value, imgURL, id){
    
    const{product_name, product_des, product_price, category_id} = value;
        return new Promise((resolve, reject)=>{
            connection.query('UPDATE product_info SET product_name=?, image=?, des=?, Price=?, Category_id=?  WHERE id=?', [product_name, imgURL, product_des, product_price, category_id, id],
            (error, result) => {
                if(error){
                    return reject(error)
                }
                else{
                    return resolve(result)
                }
            })
        })
}

function updateProductWithoutImg(value, id){
    
    const{product_name, product_des, product_price, category_id} = value;
        return new Promise((resolve, reject)=>{
            connection.query('UPDATE product_info SET product_name=?, des=?, Price=?, Category_id=?  WHERE id=?', [product_name, product_des, product_price, category_id, id],
            (error, result) => {
                if(error){
                    return reject(error)
                }
                else{
                    return resolve(result)
                }
            })
        })
}


module.exports = {
    addProduct,
    getProduct,
    delProduct,
    getImageURL,
    getProductFromID,
    updateProduct,
    updateProductWithoutImg,
    addProductWithoutImg,
    getProductFromCID,

}
