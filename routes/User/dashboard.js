const express = require('express');
const dashboardRoute = express.Router();
const passport = require('passport')

const controller = require('../../controller/User/dashboard_controller')

dashboardRoute.get('/', controller.getDashboard)

dashboardRoute.get('/login', controller.getLoginForm)
dashboardRoute.post('/login', controller.getData, passport.authenticate('user', {
    successRedirect: '/user',
    failureRedirect: '/user/login',
    failureFlash: true
}) )

dashboardRoute.get('/register', controller.getRegisterForm)
dashboardRoute.post('/register', controller.registerUser)

dashboardRoute.get('/about', controller.getAbout)
dashboardRoute.get('/contact', controller.getContactPage)

dashboardRoute.delete('/logout', controller.logout)


module.exports = dashboardRoute;