const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'ecommerce'
});


connection.connect((error)=>{
    if (error) {
        throw error
    }

    else{
        console.log('Database Connected')
    }
});

module.exports = {connection}


