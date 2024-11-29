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
class Product {
    constructor(product) {
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
Product.getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield db_1.default
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
	`);
    if (error)
        throw new Error(error.message);
    return data;
});
Product.getProductInfo = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield db_1.default
        .from('products')
        .select(`
		*,
		images:images(image_link)
	`)
        .eq('id', productId)
        .single();
    if (error)
        throw new Error(error.message);
    return data;
});
Product.updateProductInfo = (product, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield db_1.default
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
        .select();
    if (error)
        throw new Error(error.message);
    return data;
});
exports.default = Product;
