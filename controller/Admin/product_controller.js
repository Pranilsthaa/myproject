const categoryModel = require('../../model/category_model') // IMPORTING CATEGORY MODEL TO FETCH CATEGORY NAME
const productModel = require('../../model/product_model')
const {removeFile} = require('../../middleware/removeFile'); 
const { validationResult } = require('express-validator');



const getProductController = async (req, res)=>{     // FOR SELECT OPTION TAG

    try{
        const category = await categoryModel.getCategory();
        res.render('admin/product', {category: category});
    }
    catch(error){
        console.log(error)
    }
}
const getProductList = async (req, res)=>{                                          // TO DO

    try{
        const productList = await productModel.getProduct();
        res.render('admin/productList', {products: productList});
    }
    catch(error){
        console.log(error)
    }
}

const addProductController = async (req, res)=>{
     let imgSrc;
            try{
                const error = validationResult(req)
            if(!error.isEmpty()){
                    req.flash('error', error.mapped())
                    return res.redirect('/admin/product')
            }
            else{
                const imgSrc = req.file.filename;
                const data = req.body;

                const product = await productModel.addProduct(data, imgSrc);
                res.redirect('/admin/product/List');
                req.flash('success', 'ADDED SUCCESSFULLY !!!')
            }
            }
            catch(error){      
                removeFile(imgSrc);
                console.log(error);
            }       
        }   




const delProductController = async (req, res)=>{

    try{
        const id = req.params.id
        const data = await productModel.getImageURL(id);
        if(data.length > 0){
            await productModel.delProduct(id);
            removeFile(data[0].image)
        }
        res.redirect('/admin/product/list');
    }
    catch(error){
        // removeFile(imgSrc)
        console.log(error)
    }
}


const editProductontroller = async (req, res)=>{
    
    try{
        const {id} = req.params;
        const data = await productModel.getProductFromID(id);
        const category = await categoryModel.getCategory();

        return res.render('admin/product', {data: data[0], category: category, isEdit: true })
    }
    catch(error){
        console.log(error)
    }
    
}

const updateProductController = async (req, res)=>{
        
    try {
        const id = req.params.id;
        const value = req.body;
        const file = req.file;
            if (file) {
                const imgURL = req.file.filename;
                const data = await productModel.getImageURL(id);
                if (data.length > 0) {
                    await productModel.updateProduct(value, imgURL, id);
                    removeFile(data[0].image)
                }

                return res.redirect('/admin/product/List')
            }
            else {

                try {
                    const data = await productModel.updateProductWithoutImg(value, id);
                } catch (error) {
                    console.log(error)
                }
            }
        return res.redirect('/admin/product/List')
    }
    catch(error){
        console.log(error)
    }
    
}

module.exports={
    getProductController,
    addProductController,
    getProductList,
    delProductController,
    editProductontroller,
    updateProductController
}

