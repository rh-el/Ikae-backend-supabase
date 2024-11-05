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

const deleteProductQuery = () => {
    return `
    DELETE FROM
        products WHERE id=6`
}

exports.getAllProductsQuery = getAllProductsQuery
exports.getProductInfoQuery = getProductInfoQuery
exports.deleteProductQuery = deleteProductQuery