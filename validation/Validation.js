const {check} = require('express-validator')

// validateProductForm = [                                                            // Express-validator for validation
//         check('product_name').notEmpty().withMessage('Empty String'),
//         check('product_des').notEmpty().withMessage('Product Description Required !!!'),

//     ]

function validateProductForm(req, res, next) {

    if(req.file){
        validateProductForm = [                                                            // Express-validator for validation
        check('product_name').notEmpty().withMessage('Empty String'),
        check('product_des').notEmpty().withMessage('Product Description Required !!!'),
        next()
    ] }

    else{
        req.flash('error', 'NEED AN IMAGE')
        res.redirect('/admin/product')
    }
}

let validateCategoryForm = [                                                            // Express-validator for validation
    check('category_name').notEmpty().withMessage('Empty String')
]

module.exports = {
    validateProductForm,
    validateCategoryForm
}



