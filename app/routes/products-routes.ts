import { Express } from "express";
import jwt from "jsonwebtoken";
import { authenticateToken } from "../middleware/auth";

const productRoutes = (app: Express) => {
	// import products controllers
	const products = require("../controllers/products-controllers");
	const orders = require("../controllers/orders-controllers");
	// import router module from express package
	// a tool for organizing and structuring the application's routes
	const router = require("express").Router();

	// define a route for the root path
	router.get("/home", products.getAllProducts);

	// define a route for each product
	router.get("/product/:id", products.getProduct);

	// route to order
	router.post("/order", orders.postNewOrder);

	// route to get confirmation after ordering
	router.get("/confirmation/:id", products.getConfirmation);

	// define a route for dashboard
	router.get("/dashboard", products.getAllProductsDashboard);

	//route to delete product from dashboard
	router.delete("/dashboard/delete/:id", products.deleteProduct);

	//route to update product stock from dashboard (set to 'out of stock')
	router.put("/dashboard/update-stock/:id", products.updateProductStock);

	// update product infos from dashboard
	router.put("/dashboard/update-product/:id", products.updateProductInfo);

	// create a new product
	router.post("/dashboard/new-product", products.postNewProduct);

    router.get("/authentication", authenticateToken, products.getTest);

    router.post("/register", products.getToken);

	// mount the router to the main app on the specified path
	app.use("/", router);
};

export default productRoutes;
