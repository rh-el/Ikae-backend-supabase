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
        products WHERE id=6`
}

exports.getAllProductsQuery = getAllProductsQuery
exports.getProductInfoQuery = getProductInfoQuery