import { Request, Response } from "express"
import Product from "../models/product.model"
import { get } from "http"

// defines middleware getAll and assign it the getAll method from Product
const getAllProducts = (req: Request, res: Response) => {
    Product.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'An error occured while retrieving products.'
            })
            console.log('An error occured while retrieving all products');

        }
        res.send(data)
            // if (data?.length !== undefined && data.length > 0) {
            //     for (let i = 0; i < data.length; i++) {
            //         const productImages = getImages(data[i])
            //         // add image array to data
            //     }
            // }
    })
}

const getProduct = (req: Request, res: Response) => {
    Product.getProductInfo(req.params.id, (err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || 'Some error occured while getting product info with id : ${req.params.id}.'    
            })
            console.log('An error occured while retrieving product info.');
        } else {
            res.send(data)

            
        }
       
        
    })
}

const getConfirmation = (req: Request, res: Response) => {
    Product.getConfirmationInfo((err,data) => {
       if(err){
            res.status(500).send({
                message: err.message || 'An error occured while retrieving your confirmation informations.'    
            })
            console.log('An occured while retrieving your confirmation informations.');
        } else {
            res.send(data)

            
        }
       
        
    })
}

// const findById = (req ,res) => {
//     Post.findById(req.params.id, (err, data) => {
//         if (err) {
//             res.status(500).send({
//                 message: `Some error occured while getting post with id: ${req.params.id}`
//             })
//         } else {
//             res.send(data)
//         }
//     })
// }





// images request
// get all images from product id
// return arr with all urls
const getImages = (productData: Product | null) => {
    let imageArray: string[] = []
        console.log('product', productData);
    
}

exports.getAllProducts = getAllProducts
exports.getProduct = getProduct
exports.getConfirmation = getConfirmation