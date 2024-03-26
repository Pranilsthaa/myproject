const express = require("express");
const Adminroutes = express.Router();

const categoryRoutes = require('./category')
const productRoutes = require('./product')
const dashboardRoutes = require('./dashboard')

Adminroutes.use('/', dashboardRoutes);
Adminroutes.use('/category',categoryRoutes);
Adminroutes.use('/product', productRoutes);

module.exports = Adminroutes;