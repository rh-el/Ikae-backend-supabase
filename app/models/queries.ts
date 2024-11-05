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

const updateProductQuery = () => {
    return `
    UPDATE 
        products
    SET 
        in_stock = false
    WHERE 
        id=8`
}

exports.getAllProductsQuery = getAllProductsQuery
exports.getProductInfoQuery = getProductInfoQuery
exports.deleteProductQuery = deleteProductQuery
exports.updateProductQuery = updateProductQuery