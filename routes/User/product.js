const express = require('express');
const productRoute = express.Router();

const controller = require('../../controller/User/product_controller')

productRoute.get('/:id', controller.getProducts)

module.exports = productRoute