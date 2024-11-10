import { Request, Response } from "express";
import Product from "../models/product.model";

// get all products from db
// format the response object image_links field for easier client side handling
const getAllProducts = (req: Request, res: Response) => {
	Product.getAll((err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || "An error occured while retrieving products.",
			});
			console.log("An error occured while retrieving all products");
		}

		if (data?.length !== undefined && data.length > 0) {
			for (let i = 0; i < data.length; i++) {
				const formattedImageLinks = JSON.parse(data[i].image_links);
				data[i].image_links = formattedImageLinks;
			}
		}
		console.log(data);

		res.send(data);
	});
};

// get all informations of a single product
// format the response object image_links field for easier client side handling
const getProduct = (req: Request, res: Response) => {
	Product.getProductInfo(req.params.id, (err, data) => {
		if (err) {
			res.status(500).send({
				message:
					err.message ||
					"Some error occured while getting product info with id : ${req.params.id}.",
			});
			console.log("An error occured while retrieving product info.");
		} 
        
        if (data?.length !== undefined && data.length > 0) {
                const formattedImageLinks = JSON.parse(data[0].image_links);
                data[0].image_links = formattedImageLinks;            
        }
		res.send(data);
		
	});
};

// get all products from db
// exactly the same as getAllProducts for now
// can be used if informations needed in dashboard differ from those used in home
// if so, new backend dream team has to create a new Product method :)
const getAllProductsDashboard = (req: Request, res: Response) => {
	Product.getAll((err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || "Some error occured while getting posts.",
			});
			console.log(
				"Some error occured while getting all products for the dashboard"
			);
		}
		res.send(data);
	});
};

// get order confirmation information
// wondering why it's not in order-controllers as I am writing this comment
// not functional at the moment, fully functional client login/registration needed first
const getConfirmation = (req: Request, res: Response) => {
	Product.getConfirmationInfo(req.params.id, (err, data) => {
		if (err) {
			res.status(500).send({
				message:
					err.message ||
					"An error occured while retrieving your confirmation informations.",
			});
			console.log(
				"An occured while retrieving your confirmation informations."
			);
		} else {
			res.send(data);
		}
	});
};

// delete a product from the database
// this will completely delete the product and all its infos
// prefer update its in_stock field with the function below
const deleteProduct = (req: Request, res: Response) => {
	Product.deleteProductInfo(req.params.id, (err, data) => {
		if (err) {
			res.status(500).send({
				message:
					err.message || "Some error occured while deleted product info.",
			});
		} else {
			res.send("Product info deleted.");
		}
	});
};

// update the in_stock field of a product
// can only switch to false for now
// may need to handle switch to true 
const updateProductStock = (req: Request, res: Response) => {
	Product.updateProductStock(req.params.id, (err, data) => {
		if (err) {
			res.status(500).send({
				message:
					err.message || "Some error occured while updating product info.",
			});
		} else {
			res.send("Product info updated: out of stock.");
		}
	});
};

// create a new product based on the product constructor
// does not handle images upload for now
// no idea how to do it for now :|
const postNewProduct = (req: Request, res: Response) => {
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
	}
	const newProduct = new Product({
		product_name: req.body.product_name,
		price: req.body.price,
		type: req.body.type,
		material: req.body.material,
		color: req.body.color,
		state: req.body.state,
		description: req.body.description,
		in_stock: req.body.in_stock,
		user_id: req.body.user_id,
		// updated_at : req.body.updated_at
	});

	Product.postNewProduct(newProduct, (err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || "Some error occured while creating post.",
			});
		} else {
			res.send(data);
		}
	});
};

// update a product informations
const updateProductInfo = (req: Request, res: Response) => {
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
	}
	const product = new Product({
		product_name: req.body.product_name,
		price: req.body.price,
		type: req.body.type,
		material: req.body.material,
		color: req.body.color,
		state: req.body.state,
		description: req.body.description,
		in_stock: req.body.in_stock,
		user_id: req.body.user_id,
	});

	Product.updateProductInfo(product, req.params.id, (err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || "Some error occured while updating product.",
			});
		} else {
			res.send(data);
		}
	});
};

exports.getAllProducts = getAllProducts;
exports.getProduct = getProduct;
exports.deleteProduct = deleteProduct;
exports.updateProductStock = updateProductStock;
exports.getConfirmation = getConfirmation;
exports.getAllProductsDashboard = getAllProductsDashboard;
exports.postNewProduct = postNewProduct;
exports.updateProductInfo = updateProductInfo;
