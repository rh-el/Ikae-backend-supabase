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

export default Product;
