import { Request, Response } from "express";
import Product from "../models/product.model";


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