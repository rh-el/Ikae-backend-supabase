import { Request, Response } from "express";
import Product from "../models/product.model";
import supabase from "../models/db";

type ImageLink = {
	image_link: string[]
}

type ProductType = {
	color: string
	description: string
	id: number
	images: ImageLink[]
	in_stock: boolean
	material: string
	price: number
	product_name: string
	state: string
	type: string
	user_id: number
	image_links: string[]
}

// get all products from db
// format the response object image_links field for easier client side handling
const getAllProducts = async (req: Request, res: Response) => {
	try {
		const productData = await Product.getAll()
		const processedData = productData.map((product) => ({
		...product,
		images: product.images 
		  ? product.images.map(img => img.image_link)
		  : null
	  }))
		res.json(processedData)

	} catch (error: any) {

		console.error('error while fetching products:', error)
		res.status(500).json({ error: error.message})

	}
}


// // get all informations of a single product
// // format the response object image_links field for easier client side handling
const getProduct = async (req: Request, res: Response) => {
	try {
		const productData = await Product.getProductInfo(req.params.id)
		const processedProduct = productData ? {
			...productData,
			images: productData.images 
			  ? productData.images.map(img => img.image_link)
			  : null
		  } : null
		  
		res.json(processedProduct)
	} catch (error: any) {

		console.error('error while fetching products:', error)
		res.status(500).json({ error: error.message})

	}
};



// // delete a product from the database
// // this will completely delete the product and all its infos
// // prefer update its in_stock field with the function below
// const deleteProduct = (req: Request, res: Response) => {
// 	Product.deleteProductInfo(req.params.id, (err, data) => {
// 		if (err) {
// 			res.status(500).send({
// 				message:
// 					err.message || "Some error occured while deleted product info.",
// 			});
// 		} else {
// 			res.send("Product info deleted.");
// 		}
// 	});
// };

// // update the in_stock field of a product
// // can only switch to false for now
// // may need to handle switch to true 
// const updateProductStock = (req: Request, res: Response) => {
// 	Product.updateProductStock(req.params.id, (err, data) => {
// 		if (err) {
// 			res.status(500).send({
// 				message:
// 					err.message || "Some error occured while updating product info.",
// 			});
// 		} else {
// 			res.send("Product info updated: out of stock.");
// 		}
// 	});
// };

// // create a new product based on the product constructor
// // does not handle images upload for now
// // no idea how to do it for now :|
// const postNewProduct = (req: Request, res: Response) => {
// 	if (!req.body) {
// 		res.status(400).send({
// 			message: "Content can not be empty!",
// 		});
// 	}
// 	const newProduct = new Product({
// 		product_name: req.body.product_name,
// 		price: req.body.price,
// 		type: req.body.type,
// 		material: req.body.material,
// 		color: req.body.color,
// 		state: req.body.state,
// 		description: req.body.description,
// 		in_stock: req.body.in_stock,
// 		user_id: req.body.user_id,
// 		// updated_at : req.body.updated_at
// 	});

// 	Product.postNewProduct(newProduct, (err, data) => {
// 		if (err) {
// 			res.status(500).send({
// 				message: err.message || "Some error occured while creating post.",
// 			});
// 		} else {
// 			res.send(data);
// 		}
// 	});
// };

// // update a product informations
const updateProductInfo = async (req: Request, res: Response) => {
	try {
		const product = new Product({
			product_name: req.body.productName,
			price: req.body.price,
			type: req.body.type,
			material: req.body.material,
			state: req.body.state,
			description: req.body.description
		});
	
		const productData = await Product.updateProductInfo(product, req.params.id)
		res.json(productData)

	} catch (error: any) {
		
		console.error('error while fetching products:', error)
		res.status(500).json({ error: error.message})

	}

	};

exports.getAllProducts = getAllProducts;
exports.getProduct = getProduct;
exports.updateProductInfo = updateProductInfo;
// exports.deleteProduct = deleteProduct;
// exports.updateProductStock = updateProductStock;
// exports.getConfirmation = getConfirmation;
// exports.getAllProductsDashboard = getAllProductsDashboard;
// exports.postNewProduct = postNewProduct;
