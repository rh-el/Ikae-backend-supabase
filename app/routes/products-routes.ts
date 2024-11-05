import { Express } from "express";
const productRoutes = (app: Express) => {

    // import products controllers
    const products = require("../controllers/products-controllers")

    // import router module from express package
    // a tool for organizing and structuring the application's routes
    const router = require("express").Router()

    // define a route for the root path
    router.get('/', products.getAll)

    




    // mount the router to the main app on the specified path
    app.use('/api/products', router)
}

export default productRoutes