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

const deleteProductQuery = (productID: string) => {
    return `
    DELETE FROM
        products WHERE id=${productID}`
}

const updateProductQuery = (productID: string) => {
    return `
    UPDATE 
        products
    SET 
        in_stock = false
    WHERE 
        id=${productID}`
}

exports.getAllProductsQuery = getAllProductsQuery
exports.getProductInfoQuery = getProductInfoQuery
exports.deleteProductQuery = deleteProductQuery
exports.updateProductQuery = updateProductQuery