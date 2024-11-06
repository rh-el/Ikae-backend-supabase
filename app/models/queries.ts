const getAllProductsQuery = () => {
    return `
    SELECT 
    products.id,
    products.product_name, 
    products.price,
    products.type,
    products.material,
    products.color,
    products.state,
    products.description,
    products.in_stock,
    products.user_id,
    CONCAT('[', GROUP_CONCAT(CONCAT('"', images.image_link, '"') SEPARATOR ', '), ']') AS image_links
FROM 
    products 
INNER JOIN 
    images ON images.product_id = products.id
GROUP BY 
    products.id;`
}

const getProductInfoQuery = (productID:string) => {
    return `
    SELECT
        *
    FROM
        products WHERE id = ${productID}`
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

const getConfirmationInfoQuery = (orderID: string) => {
    return `
    SELECT orders.user_id, orders.total_price, order_items.order_id, products.product_name, products.price, products.description, users.firstname, users.lastname
    FROM orders
    INNER JOIN order_items ON orders.id = order_items.order_id
    INNER JOIN products ON products.id = order_items.product_id
    INNER JOIN users ON users.id = orders.user_id
    WHERE orders.id=${orderID}
    `
}


const postNewProductQuery = () => {
    return `
    INSERT INTO 
        products (product_name, price, type, material, color, state, description, in_stock, user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
}


exports.getAllProductsQuery = getAllProductsQuery
exports.getProductInfoQuery = getProductInfoQuery
exports.deleteProductQuery = deleteProductQuery
exports.updateProductQuery = updateProductQuery
exports.getConfirmationInfoQuery = getConfirmationInfoQuery 
exports.postNewProductQuery = postNewProductQuery