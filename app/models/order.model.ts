import connection from "./db";
const queries = require("../models/queries");

interface Order {
	order_id: number;
	user_id: number;
	total_price: number;
	product_id: number[];
}

class Order {
	static postNewOrder: (
		newOrder: Order,
		result: (err: Error | null, data: Order | null) => void
	) => void;
	static postNewOrderItem: (
		order_id: number,
		product_id: number,
		result: (err: Error | null, data: number[] | null) => void
	) => void;
	constructor(order: any) {
		this.order_id = order.order_id;
		this.user_id = order.user_id;
		this.total_price = order.total_price;
		this.product_id = order.product_id;
	}
}

Order.postNewOrder = (
	newOrder: Order,
	result: (err: Error | null, data: Order | null) => void
) => {
	const query = queries.postNewOrderQuery();

	console.log(newOrder);
	connection.query(
		query,
		[newOrder.user_id, newOrder.total_price],
		(err: Error, res: Order) => {
			if (err) {
				console.log("error: ", err);
				result(err, null);
				return;
			}
			result(null, newOrder);
		}
	);
};

Order.postNewOrderItem = (
	order_id: number,
	product_id: number,
	result: (err: Error | null, data: number[] | null) => void
) => {
	const query = queries.postNewOrderItemQuery();

	connection.query(query, [order_id, product_id], (err: Error, res: Order) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}
		result(null, [order_id, product_id]);
	});
};

export default Order;
