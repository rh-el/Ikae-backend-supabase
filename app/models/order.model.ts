import supabase from "./db";

const queries = require("../models/queries");

interface Order {
	order_id: number;
	user_id: number;
	total_price: number;
	insertId: number;
}

class Order {
	static postNewOrder: (
		newOrder: Order,
	) => Promise<number>;
	static postNewOrderItem: (
		linesToInsert: object[]
	) => void;
	constructor(order: any) {
		this.order_id = order.order_id;
		this.user_id = order.user_id;
		this.total_price = order.total_price;
	}
}

// creates a new order
Order.postNewOrder = async (newOrder: Order): Promise<number> => {
	const { data, error } = await supabase
		.from('orders')
		.insert(newOrder)
		.select()
		if (error) throw new Error(error.message)
	return data[0].id
}

Order.postNewOrderItem = async (linesToInsert: object[]): Promise<any> => {
	const { data, error } = await supabase
		.from('order_items')
		.insert(linesToInsert)
		.select()
		if (error) throw new Error(error.message)
	return data
}

export default Order;
