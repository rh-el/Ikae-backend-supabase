import { Express } from "express";
const productRoutes = (app: Express) => {

    // import products controllers
    const products = require("../controllers/products-controllers")

    // import router module from express package
    // a tool for organizing and structuring the application's routes
    const router = require("express").Router()

    // define a route for the root path
    router.get('/home', products.getAllProducts)

    //route for each product
    router.get('/product/:id', products.getProduct)

    //route to delete product from dashboard
    router.delete('/dashboard/delete/6', products.deleteProduct)

    //route to update product from dashboard
    router.put('/dashboard/update/8', products.updateProduct)


    // mount the router to the main app on the specified path
    app.use('/', router)
}

export default productRoutes