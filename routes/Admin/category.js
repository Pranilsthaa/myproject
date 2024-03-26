const express = require("express");
const category_routes = express.Router();
// const {body, validationResult} = require('express-validator')
const controller = require("../../controller/Admin/category_controller");
const validate = require('../../validation/Validation')

category_routes.get('/', controller.categoryController);
category_routes.post('/', validate.validateCategoryForm, controller.addCategoryController)
category_routes.get('/List', controller.getCategoryController) // Fetching category id
category_routes.get('/edit/:id', controller.editCategoryController) // Opening EDIT FORM FOR SPECIFIC ID
category_routes.post('/update/:id', controller.updateCategoryController) // UPDATING CATEGORY_NAME
category_routes.get('/delete/:id', controller.deleteCategoryController)

module.exports = category_routes;



