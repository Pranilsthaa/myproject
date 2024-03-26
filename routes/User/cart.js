const express = require('express')
const cartRoute = express.Router();
const controller = require('../../controller/User/cartController')


cartRoute.get('/', controller.getCart)
cartRoute.get('/:id', controller.addNewItem)

cartRoute.get('/increment/:id', controller.IncrementItem)
cartRoute.get('/decrement/:id', controller.decrementItem)

module.exports = cartRoute;