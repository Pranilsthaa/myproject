const productModel = require('../../model/product_model')
const categoryModel = require('../../model/category_model')
const groupByFour = require('../../middleware/groupByFour')

const getProducts = async (req, res)=>{                                          // TO DO

    try{
        const id = req.params.id;
        const category = await categoryModel.getCategory();
        const product = await productModel.getProductFromCID(id);

        res.render('user/product-grid', {product: groupByFour(product), data: category, layout: 'user_main', userAuth: req.isAuthenticated()});
    }
    catch(error){
        console.log(error)
    }
}

module.exports = {
    getProducts
}