const express = require("express");
const userRoute = express.Router();

const dashboardRoute = require('./dashboard')
const productRoute = require('./product')
const cartRoute = require('./cart')


userRoute.use('/', dashboardRoute)
userRoute.use('/product', productRoute)
userRoute.use('/cart', cartRoute)


module.exports = userRoute