import { Request, Response } from "express";
import Order from "../models/order.model";

const postNewOrder = (req: Request, res: Response) => {
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
	}
	const newOrder = new Order({
		order_id: req.body.order_id,
		user_id: req.body.user_id,
		total_price: req.body.total_price,
		product_id: req.body.product_id,
	});

	Order.postNewOrder(newOrder, (err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || "Some error occured while posting a new order.",
			});
		} else {
			for (let i = 0; i < newOrder.product_id.length; i++) {
				Order.postNewOrderItem(
					data!.order_id,
					newOrder.product_id[i],
					(err, data) => {
						if (err) {
							res.status(500).send({
								message:
									err.message ||
									"Some error occured while posting a new order item.",
							});
						} else {
							res.end();
						}
					}
				);
			}
		}
	});
};

exports.postNewOrder = postNewOrder;
