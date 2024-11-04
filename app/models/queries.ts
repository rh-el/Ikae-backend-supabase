const getAllProductsQuery = () => {
    return `
    SELECT
        *
    FROM
        products`
}

exports.getAllProductsQuery = getAllProductsQuery