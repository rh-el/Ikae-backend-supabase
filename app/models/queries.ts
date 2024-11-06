const getAllProductsQuery = () => {
    return `
    SELECT
        *
    FROM
        products`
}

const getProductInfoQuery = (productID:number) => {
    return `
    SELECT
        *
    FROM
        products WHERE id = ${productID}`
}

exports.getAllProductsQuery = getAllProductsQuery
exports.getProductInfoQuery = getProductInfoQuery