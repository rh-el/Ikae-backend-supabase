import { Request, Response } from "express"
import Product from "../models/product.model"

// defines middleware getAll and assign it the getAll method from Product
const getAll = (req: Request, res: Response) => {
    Product.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occured while getting posts.'
            })
        } else {
            res.send(data)
        }
    })
}

exports.getAll = getAll