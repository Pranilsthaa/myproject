const { validationResult } = require('express-validator')
const categoryModel = require('../../model/category_model')  // importing database queryies..\

const categoryController = (req, res) => {
    res.render('../views/admin/category')
    
}

const addCategoryController =  async (req, res) => {
    const error = validationResult(req)

    if(!error.isEmpty()){
        req.flash('error', error.mapped())
        res.redirect('/admin/category')
    }   
    else{
            try{
                const data = await categoryModel.addCategory(req.body);
                res.render('../views/admin/category.hbs')
                // console.log(data);
            }
            catch(error){
                console.log(error.code)
                if(error.code) {
                    req.flash('error', {category_name: {msg: error.code}} )
                    res.redirect('/admin/category')
                }
                
            }
        }       
}

// TO INSERT CATEGORY

const getCategoryController = async (req, res) =>{
    try{
        const data = await categoryModel.getCategory();
        return res.render('admin/categoryList', {list: data, isEdit: false})
    }

    catch{
        res.sendFile('../views/error.hbs', {root:__dirname})
        console.log(error)
    }
}

const editCategoryController = async (req, res) =>{
    const id = req.params.id
    try{
        const data = await categoryModel.getCategoryID(id);
        return res.render('admin/category', {list: data[0], isEdit: true})
    }

    catch{
        res.sendFile('../views/error.hbs', {root:__dirname})
        console.log(error)
    }
}

const updateCategoryController = async (req, res) =>{
    const id = req.params.id
    const {category_name} = req.body
    try{
        const data = await categoryModel.updateCategory(id, category_name);
        return res.redirect('/admin/category/List')
    }

    catch{
        res.sendFile('../views/error.hbs', {root:__dirname})
        console.log(error)
    }
}

const deleteCategoryController = async (req, res) =>{
    const id = req.params.id

    try{
        const data = await categoryModel.deleteCategory(id);
        return res.redirect('/admin/category/List')
    }

    catch(error){
       req.flash('error', 'Cannot delete the item');
       res.redirect('/admin/category/List')  
    }
}


module.exports = {
    categoryController,
     addCategoryController,
      getCategoryController,
       editCategoryController,
        updateCategoryController,
         deleteCategoryController
}