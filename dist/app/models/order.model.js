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
const db_1 = __importDefault(require("./db"));
class Order {
    constructor(order) {
        this.order_id = order.order_id;
        this.user_id = order.user_id;
        this.total_price = order.total_price;
    }
}
// creates a new order
Order.postNewOrder = (newOrder) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield db_1.default
        .from('orders')
        .insert(newOrder)
        .select();
    if (error)
        throw new Error(error.message);
    return data[0].id;
});
Order.postNewOrderItem = (linesToInsert) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield db_1.default
        .from('order_items')
        .insert(linesToInsert)
        .select();
    if (error)
        throw new Error(error.message);
    return data;
});
exports.default = Order;
