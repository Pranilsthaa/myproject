const express = require('express')
const product_routes = express.Router();
const upload = require('../../middleware/imageHandler')
const validate = require('../../validation/Validation')

const controller = require('../../controller/Admin/product_controller')

product_routes.get('/', controller.getProductController)

product_routes.post('/',upload.single('image'), validate.validateProductForm ,controller.addProductController)


product_routes.get('/list', controller.getProductList)

product_routes.get('/delete/:id', controller.delProductController)

product_routes.get('/edit/:id/:c_id', controller.editProductontroller)    //EDIT FORM
product_routes.post('/update/:id/', upload.single('image'), controller.updateProductController)

module.exports = product_routes;