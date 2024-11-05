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

const getConfirmationInfoQuery = () => {
    return `
    SELECT orders.user_id, orders.total_price, order_items.order_id, products.product_name, products.price, products.description
    FROM orders
    INNER JOIN order_items ON orders.id = order_items.order_id
    INNER JOIN products ON products.id = order_items.product_id
    `

}

exports.getAllProductsQuery = getAllProductsQuery
exports.getProductInfoQuery = getProductInfoQuery
exports.getConfirmationInfoQuery = getConfirmationInfoQuery 