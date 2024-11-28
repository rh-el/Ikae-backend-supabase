import supabase from "./db";

type ImageLink = {
	image_link: string[]
}
interface Product {
	product_name: string;
	price: number;
	type: string;
	material: string;
	color: string;
	state: string;
	description: string;
	in_stock: boolean;
	user_id: number;
	image_links: string;
	images: ImageLink[]
}

class Product {
	static getAll: (
	) => Promise<Product[]>;
	static getProductInfo: (
		productID: string,
	) => Promise<Product>;
	static getConfirmationInfo: (
		orderID: string,
		result: (err: Error | null, data: Product[] | null) => void
	) => void;
	static postNewProduct: (
		newProduct: Product,
		result: (err: Error | null, data: Product | null) => void
	) => void;
	static deleteProductInfo: (
		productID: string,
		result: (err: Error | null, data: Product | null) => void
	) => void;
	static updateProductStock: (
		productID: string,
		result: (err: Error | null, data: Product | null) => void
	) => void;
	static updateProductInfo: (
		productInfos: Product,
		productID: string,
	) => Promise<Product>;

	constructor(product: any) {
		this.product_name = product.product_name;
		this.price = product.price;
		this.type = product.type;
		this.material = product.material;
		this.color = product.color;
		this.state = product.state;
		this.description = product.description;
		this.in_stock = product.in_stock;
		this.user_id = product.user_id;
		this.image_links = product.image_links;
	}
}

Product.getAll = async () => {
	const { data, error } = await supabase
	.from('products')
	.select(`
	  id, 
	  product_name, 
	  price,
	  type,
	  material,
	  color,
	  state,
	  description,
	  in_stock,
	  user_id,
	  images:images(image_link)
	`)
	if (error) throw new Error(error.message)
	return data
}

Product.getProductInfo = async (productId) => {
	const { data, error } = await supabase	
	.from('products')
	.select(`
		*,
		images:images(image_link)
	`)
	.eq('id', productId)
	.single()

	if (error) throw new Error(error.message)
	return data	
}

Product.updateProductInfo = async (product: Product, productId) => {
	const { data, error } = await supabase
		.from('products')
		.update({ 
			product_name: product.product_name,
			description: product.description,
			material: product.material,
			price: product.price,
			state: product.state,
			type: product.type
		})
		.eq("id", productId)
		.select()
	
	if (error) throw new Error(error.message)
	return data
}


// // get all products from products table
// Product.getAll = (
// 	result: (err: Error | null, data: Product[] | null) => void
// ) => {
// 	// gets corresponding query
// 	const query = queries.getAllProductsQuery();
// 	// trigs query
// 	// connection represents our db connection from db.ts file
// 	connection.query(query, (err: Error, res: Product[]) => {
// 		// error handler
// 		if (err) {
// 			console.log("error: ", err);
// 			result(err, null);
// 			return;
// 		}
// 		// returns query result
// 		console.log("✅ products: ", res);
// 		result(null, res);
// 	});
// };

// // get all products from products table
// Product.getAll = (
// 	result: (err: Error | null, data: Product[] | null) => void
// ) => {
// 	// gets corresponding query
// 	const query = queries.getAllProductsQuery();
// 	// trigs query
// 	// connection represents our db connection from db.ts file
// 	connection.query(query, (err: Error, res: Product[]) => {
// 		// error handler
// 		if (err) {
// 			console.log("error: ", err);
// 			result(err, null);
// 			return;
// 		}
// 		// returns query result
// 		console.log("✅ products: ", res);
// 		result(null, res);
// 	});
// };


// // get all informations of a specific product
// Product.getProductInfo = (
// 	productID: string,
// 	result: (err: Error | null, data: Product | null) => void
// ) => {
// 	const query = queries.getProductInfoQuery(productID);

// 	connection.query(query, (err: Error, res: Product) => {
// 		// error handler
// 		if (err) {
// 			console.log("error: ", err);
// 			result(err, null);
// 			return;
// 		}
// 		// returns query result
// 		console.log("product: ", res);
// 		result(null, res);
// 	});
// };

// // delete a product from the database - not intended to be used for now, prefer use updateProductStock
// Product.deleteProductInfo = (
// 	productID: string,
// 	result: (err: Error | null, data: Product | null) => void
// ) => {
// 	const query = queries.deleteProductQuery(productID);

// 	connection.query(query, (err: Error, res: Product) => {
// 		// error handler
// 		if (err) {
// 			console.log("error: ", err);
// 			result(err, null);
// 			return;
// 		}
// 		// returns query result
// 		console.log("product: ", res);
// 		result(null, res);
// 	});
// };

// // update a product 'in_stock' field to false
// Product.updateProductStock = (
// 	productID: string,
// 	result: (err: Error | null, data: Product | null) => void
// ) => {
// 	const query = queries.updateProductStockQuery(productID);

// 	connection.query(query, (err: Error, res: Product) => {
// 		// error handler
// 		if (err) {
// 			console.log("error: ", err);
// 			result(err, null);
// 			return;
// 		}
// 		// returns query result
// 		console.log("product: ", res);
// 		result(null, res);
// 	});
// };

// // create a new product
// Product.postNewProduct = (
// 	newProduct: Product,
// 	result: (err: Error | null, data: Product | null) => void
// ) => {
// 	const query = queries.postNewProductQuery();

// 	connection.query(
// 		query,
// 		[
// 			newProduct.product_name,
// 			newProduct.price,
// 			newProduct.type,
// 			newProduct.material,
// 			newProduct.color,
// 			newProduct.state,
// 			newProduct.description,
// 			newProduct.in_stock,
// 			newProduct.user_id,
// 		],
// 		(err: Error, res: Product) => {
// 			if (err) {
// 				console.log("error: ", err);
// 				result(err, null);
// 				return;
// 			}
// 			console.log("New product: ", { ...newProduct });
// 			result(null, { ...newProduct });
// 		}
// 	);
// };

// // get informations (price, products id, user_id, ..) of a specific order
// Product.getConfirmationInfo = (
// 	orderID: string,
// 	result: (err: Error | null, data: Product[] | null) => void
// ) => {
// 	const query = queries.getConfirmationInfoQuery(orderID);

// 	connection.query(query, (err: Error, res: Product[]) => {
// 		if (err) {
// 			console.log("error: ", err);
// 			result(err, null);
// 			return;
// 		}
// 		console.log("product: ", res);
// 		result(null, res);
// 	});
// };

// // update informations of a product
// Product.updateProductInfo = (
// 	product: Product,
// 	productID: string,
// 	result: (err: Error | null, data: Product | null) => void
// ) => {
// 	const query = queries.updateProductInfoQuery(
// 		productID,
// 		product.product_name,
// 		product.price,
// 		product.type,
// 		product.material,
// 		product.color,
// 		product.state,
// 		product.description,
// 		product.in_stock,
// 		product.user_id
// 	);
// 	console.log(query);

// 	connection.query(query, (err: Error, res: Product) => {
// 		if (err) {
// 			console.log("error: ", err);
// 			result(err, null);
// 			return;
// 		}
// 		console.log("New product: ", product);
// 		result(null, product);
// 	});
// };

export default Product;
