const productModels = require("./product.model");

const getAllProductsQuery = () => {
    return `
    SELECT
        *
    FROM
        products`
}

const getProductInfoQuery = () => {
    return `
    SELECT
        *
    FROM
        products WHERE id = ${id}`
}

exports.getAllProductsQuery = getAllProductsQuery
exports.getProductInfoQuery = getProductInfoQuery