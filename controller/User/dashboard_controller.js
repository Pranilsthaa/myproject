const categoryModel = require('../../model/category_model')
const productModel = require('../../model/product_model')
const userModel = require('../../model/user_model')
const initialize = require('../../Passport-config/passport-config-user');
const passport = require('passport')
const bcrypt = require('bcrypt');

const getDashboard = async (req, res) => {
    try{
        const data = await categoryModel.getCategory();
        const allProducts = await productModel.getProduct();
        res.render('user/index', {layout: 'user_main', data: data, info: req.user,allProducts: allProducts, userAuth: req.isAuthenticated()})
        console.log(req.user);
    }catch(error){
        console.log(error);
    }
}

const getAbout = async (req, res) => {
    try{
        res.render('user/aboutus', {layout: 'user_main'})
    }catch(error){
        console.log(error);
    }
}

const getContactPage = async (req, res) => {
    try{
        res.render('user/contact', {layout: 'user_main'})
    }catch(error){
        console.log(error);
    }
}

const getLoginForm = async (req, res) => {
    try{
        // const data = await categoryModel.getCategory();
        res.render('Auth/userLogin', {layout: 'user_main'})
    }catch(error){
        console.log(error);
    }
}

const getRegisterForm = async (req, res) => {
    try{
        // const data = await categoryModel.getCategory();
        res.render('Auth/userRegister', {layout: 'user_main'})
    }catch(error){
        console.log(error);
    }
}

const registerUser = async (req, res) => {
    try{
        const value = req.body;
        const hasedPassword = await bcrypt.hash(req.body.password, 10);
        let data = await userModel.registerUser(value, hasedPassword);

        res.redirect('/user')
    }catch(error){
        console.log(error);
    }
}

const getData = async (req, res, next) => {
    try{
        const data = await userModel.getUserDetail();
        if (!Array.isArray(data)) {
            throw new Error('Invalid data format returned by getApplicantDetail');
        }
        initialize(passport, 
            email => data.find(user => user.email === email),
            id => data.find(user => user.user_id === id)
            );
            next();
        } catch(error){
            throw error
        } 
    }

    const logout = (req, res) => {
        req.logout((err)=>{
                if(err){
                    return next(err)
                }
            res.redirect('/user/login')
        });
    }

module.exports = {
    getDashboard,
    getLoginForm,
    getRegisterForm,
    registerUser,
    getData,
    logout,
    getAbout,
    getContactPage
}

