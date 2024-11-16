import { Request, Response } from "express";
import Order from "../models/order.model";
import User from "../models/user.model";
import { authenticateToken } from "../middleware/auth";
import jwt from 'jsonwebtoken';
import { log } from "console";


const getEmailFromToken = (token: string): Promise<any> => {
	console.log(token);
	
	return new Promise((resolve, reject) => {
	  jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, decoded: any) => {
		if (err) {
		  reject(err);
		} else if (typeof decoded.email === 'string') {
		  resolve(decoded.email);
		} else {
		  reject(new Error('Invalid token format'));
		}
	  });
	});
};



const postNewOrder = async (req: Request, res: Response) => {

	let postResponse = {
	}
	
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
	}

	
	// get email associated to a token
	const userEmail: any = await getEmailFromToken(req.body.token)	

	postResponse = { ...postResponse, "user_email": userEmail}
	
	// get id from email
	User.getIdFromEmail(userEmail, (err, userId: any) => {
		if (err) {
			res.status(500).send({
				message: err.message || "Some error occured while getting posts.",
			});
			console.log(
				"Some error occured while getting user Id from email"
			);
		} else {
			const newOrder = new Order({
				user_id: userId[0].id,
				total_price: req.body.total_price,
			});
		
			// create now order with user_id and total_price
			Order.postNewOrder(newOrder, (err, data) => {
				if (err) {
					res.status(500).send({
						message: err.message || "Some error occured while posting a new order.",
					});
				} else {

					// create order items with order_id and productid[]
					req.body.products_id.forEach((productId: any) => {
						
						Order.postNewOrderItem(data!.insertId, productId, (err, data) => {
							if (err) {
								res.status(500).send({
									message:
									err.message ||
									"Some error occured while posting a new order item.",
								})
							} 
						})
					});
				postResponse = { ...postResponse, "order_id": data?.insertId}
				res.send(postResponse)
				}

			// res.send(userId);
		})
			
		}
})
}

exports.postNewOrder = postNewOrder;
