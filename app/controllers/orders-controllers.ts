import { Request, Response } from "express";
import Order from "../models/order.model";
import User from "../models/user.model";
import jwt from 'jsonwebtoken';


const getEmailFromToken = (token: string): Promise<string> => {	
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

const validateHeader = (header: any, fieldName: string): string => {
    if (!header) {
        throw new Error(`No ${fieldName} provided in headers`);
    }
    return Array.isArray(header) ? header[0] : header;
};

const postNewOrder = async (req: Request, res: Response) => {
	try {

		const token = validateHeader(req.headers['authorization'], "authorization")
		const userEmail: string = await getEmailFromToken(token)
		const userId = await User.getIdFromEmail(userEmail) 

		const newOrder = new Order({ user_id: userId, total_price: req.body.total_price	})
		const newOrderId = await Order.postNewOrder(newOrder)

		const productIds = req.body.products_ids

		if (!productIds || productIds.length === 0) {
			throw new Error('no product ids in request body')
		}
		let orderDataToInsert: object[] = []
		productIds.forEach((id: number) => {
			orderDataToInsert.push({ order_id: newOrderId, product_id: id })
		});
		
		const newOrderItems = await Order.postNewOrderItem(orderDataToInsert)
		console.log(newOrderItems)

		const responseData = {
			order_id: newOrderId,
			user_email: userEmail,
			total_price: req.body.total_price,
			product_ids: req.body.products_ids
		}

		res.json(responseData)

	} catch (error) {

		console.error("some error occured while posting new order:", error)
		return res.status(500).json({
			error: error || 'some error occured while posting new order'
		})
	}
}

exports.postNewOrder = postNewOrder;