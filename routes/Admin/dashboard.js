const express = require("express");
const routes = express.Router();

const controller = require("../../controller/Admin/dashboard_controller");

routes.get('/',controller.dashboardController);


module.exports = routes;
