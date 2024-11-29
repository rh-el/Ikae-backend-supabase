"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = __importDefault(require("../models/order.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getEmailFromToken = (token) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                reject(err);
            }
            else if (typeof decoded.email === 'string') {
                resolve(decoded.email);
            }
            else {
                reject(new Error('Invalid token format'));
            }
        });
    });
};
const validateHeader = (header, fieldName) => {
    if (!header) {
        throw new Error(`No ${fieldName} provided in headers`);
    }
    return Array.isArray(header) ? header[0] : header;
};
const postNewOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = validateHeader(req.headers['authorization'], "authorization");
        const userEmail = yield getEmailFromToken(token);
        const userId = yield user_model_1.default.getIdFromEmail(userEmail);
        const newOrder = new order_model_1.default({ user_id: userId, total_price: req.body.total_price });
        const newOrderId = yield order_model_1.default.postNewOrder(newOrder);
        const productIds = req.body.products_ids;
        if (!productIds || productIds.length === 0) {
            throw new Error('no product ids in request body');
        }
        let orderDataToInsert = [];
        productIds.forEach((id) => {
            orderDataToInsert.push({ order_id: newOrderId, product_id: id });
        });
        const newOrderItems = yield order_model_1.default.postNewOrderItem(orderDataToInsert);
        console.log(newOrderItems);
        const responseData = {
            order_id: newOrderId,
            user_email: userEmail,
            total_price: req.body.total_price,
            product_ids: req.body.products_ids
        };
        res.json(responseData);
    }
    catch (error) {
        console.error("some error occured while posting new order:", error);
        return res.status(500).json({
            error: error || 'some error occured while posting new order'
        });
    }
});
exports.postNewOrder = postNewOrder;
