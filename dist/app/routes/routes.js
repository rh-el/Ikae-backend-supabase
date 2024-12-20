"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products = require("../controllers/products-controllers");
const orders = require("../controllers/orders-controllers");
const users = require("../controllers/users-controllers");
const productRoutes = (app) => {
    // import router module from express package
    // a tool for organizing and structuring the application's routes
    const router = require("express").Router();
    // define a route for the root path
    router.get("/home", products.getAllProducts);
    // // define a route for each product
    router.get("/product/:id", products.getProduct);
    // // route to order
    router.post("/order", orders.postNewOrder);
    // // define a route for dashboard
    // router.get("/dashboard", authenticateToken, products.getAllProductsDashboard);
    // // update product infos from dashboard
    router.put("/dashboard/update-product/:id", products.updateProductInfo);
    // // test route for token check middleware
    // // not good - TODO
    router.get("/login", users.login);
    // // create a new user, return token
    router.post("/register", users.register);
    // // mount the router to the main app on the specified path
    app.use("/", router);
};
exports.default = productRoutes;
