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
const product_model_1 = __importDefault(require("../models/product.model"));
// get all products from db
// format the response object image_links field for easier client side handling
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = yield product_model_1.default.getAll();
        const processedData = productData.map((product) => (Object.assign(Object.assign({}, product), { images: product.images
                ? product.images.map(img => img.image_link)
                : null })));
        res.json(processedData);
    }
    catch (error) {
        console.error('error while fetching products:', error);
        res.status(500).json({ error: error.message });
    }
});
// // get all informations of a single product
// // format the response object image_links field for easier client side handling
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = yield product_model_1.default.getProductInfo(req.params.id);
        const processedProduct = productData ? Object.assign(Object.assign({}, productData), { images: productData.images
                ? productData.images.map(img => img.image_link)
                : null }) : null;
        res.json(processedProduct);
    }
    catch (error) {
        console.error('error while fetching products:', error);
        res.status(500).json({ error: error.message });
    }
});
// // update a product informations
const updateProductInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = new product_model_1.default({
            product_name: req.body.productName,
            price: req.body.price,
            type: req.body.type,
            material: req.body.material,
            state: req.body.state,
            description: req.body.description
        });
        const productData = yield product_model_1.default.updateProductInfo(product, req.params.id);
        res.json(productData);
    }
    catch (error) {
        console.error('error while fetching products:', error);
        res.status(500).json({ error: error.message });
    }
});
exports.getAllProducts = getAllProducts;
exports.getProduct = getProduct;
exports.updateProductInfo = updateProductInfo;
