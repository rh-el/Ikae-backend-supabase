const productModels = require("./product.model");

const getAllProductsQuery = () => {
    return `
    SELECT
        *
    FROM
        products`
}

const getProductInfoQuery = (productID:any) => {
    return `
    SELECT
        *
    FROM
        products WHERE id = ${productID}`
}

exports.getAllProductsQuery = getAllProductsQuery
exports.getProductInfoQuery = getProductInfoQuery