function inc (value){
    return parseInt(value) + 1;
}

function ifElse(arg1, arg2, options){
    return arg1==arg2 ? options.fn(this) : options.inverse(this) ; 
}

function calculateTotalPrice(products) {
    let totalPrice = 0;
    for(let i = 0; i < products.length; i++) {
        totalPrice += products[i].price * products[i].qty;
    }
    return totalPrice;
}

function grandTotal(value){
    return value + 100;
}

function reverse(value){
    return !value;
}

module.exports = {
    inc,
    ifElse,
    calculateTotalPrice,
    grandTotal,
    reverse
}