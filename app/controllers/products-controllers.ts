import { Request, Response } from "express"
import Product from "../models/product.model"

// defines middleware getAll and assign it the getAll method from Product
const getAllProducts = (req: Request, res: Response) => {
    Product.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occured while getting posts.'
            })
            console.log('Some error occured while getting all products');
            res.send(data)
        }
    })
}

const getProduct = (req: Request, res: Response) => {
    Product.getProductInfo((err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || 'Some error occured while getting product info.'    
            })
            console.log('Some error occured while getting product info.');
        } else {
            res.send(data)
        }
    })
}

exports.getAllProducts = getAllProducts
exports.getProduct = getProduct

