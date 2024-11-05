import { Request, Response } from "express"
import Product from "../models/product.model"
import { get } from "http"

// defines middleware getAll and assign it the getAll method from Product
const getAll = (req: Request, res: Response) => {
    Product.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occured while getting posts.'
            })
        } else {
            res.send(data)
            if (data?.length !== undefined && data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    const productImages = getImages(data[i])
                    // add image array to data
                }
            }
            
        }
       
        
    })
}

// images request
// get all images from product id
// return arr with all urls
const getImages = (productData: Product | null) => {
    let imageArray: string[] = []
        console.log('product', productData);
    
}

exports.getAll = getAll