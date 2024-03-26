const productModel = require('../../model/product_model');
const categoryModel = require('../../model/category_model')

const getCart = async (req, res) => {
    try{
    const cart = req.session.cart || {};
    const data = await categoryModel.getCategory();
    console.log(cart);
    return res.render('user/cart', {layout: 'user_main', cart: cart, data: data})
    }
    catch(error){
        console.log(error);
    }
}

const addNewItem = async (req, res) => {

    const id = req.params.id;
    let c_id;
    
    if(!req.session.cart) {
        req.session.cart = [];
    }

    let count = 0;
    for (let i=0; i<req.session.cart.length; i++) {
        if(req.session.cart[i].id === id) {
            req.session.cart[i].qty += 1;
            count++;
            c_id = req.session.cart[i].c_id;
        }
    }

    if(count===0) {
         data = await productModel.getProductFromID(id);
         c_id = data[0].Category_ID;
        const cart_data = {
            id: id,
            product_name: data[0].product_name,
            price: data[0].Price,
            image: data[0].image,
            qty: 1,
            c_id: data[0].Category_ID
        }
        req.session.cart.push(cart_data);
    }

    return res.redirect(`/user/product/${c_id}`)
}

// const addNewItem = async (req, res) => {

//     const id = req.params.id;
//     let c_id;
    
//     if(!req.session.cart) {
//         req.session.cart = [];
//     }

//     let count = 0;
//     for (let i=0; i<req.session.cart.length; i++) {
//         if(req.session.cart[i].id === id) {
//             req.session.cart[i].qty += 1;
//             count++;
//             c_id = req.session.cart[i].c_id;
//         }
//     }

//     if(count===0) {
//          data = await productModel.getProductFromID(id);
//          c_id = data[0].Category_ID;
//         const cart_data = {
//             id: id,
//             product_name: data[0].product_name,
//             price: data[0].Price,
//             image: data[0].image,
//             qty: 1,
//             c_id: data[0].Category_ID
//         }
//         req.session.cart.push(cart_data);
//     }

//     return res.redirect(`/user/product/${c_id}`)
// }

const IncrementItem = async (req, res) => {
    const id = req.params.id;

    if (!req.session.cart) {
        req.session.cart = [];
    }

    let count = 0;
    for (let i = 0; i < req.session.cart.length; i++) {
        if (req.session.cart[i].id === id) {
            req.session.cart[i].qty += 1;
            count++;
        }
    }

    if (count === 0) {
        const data = await productModel.getProductById(id);
        console.log(data);
        const cart_data = {
            id: id,
            productName: data[0].product_name,
            price: data[0].Price,
            image: data[0].image,
            qty: 1
        };

        req.session.cart.push(cart_data);
    }
    return res.redirect("/user/cart");
};

const decrementItem = async (req, res) => {
    const id = req.params.id;

    if (!req.session.cart) {
        req.session.cart = [];
    }

    let count = 0;
    for (let i = 0; i < req.session.cart.length; i++) {
        if (req.session.cart[i].id === id) {
            if (req.session.cart[i].qty > 0) {
                req.session.cart[i].qty -= 1;
                if (req.session.cart[i].qty === 0) {
                    req.session.cart.splice(i, 1); // Remove item from cart if quantity reaches 0
                }
            }
            count++;
        }
    }

    if (count === 0) {
        const data = await productModel.getProductFromID(id);
        const cart_data = {
            id: id,
            productName: data[0].product_name,
            price: data[0].price,
            image: data[0].image,
            qty: 1
        };

        req.session.cart.push(cart_data);
    }
    return res.redirect("/user/cart");
};

module.exports = {
    addNewItem,
    getCart,
    IncrementItem,
    decrementItem
};



module.exports={
    addNewItem,
    getCart,
    IncrementItem,
    decrementItem
}

