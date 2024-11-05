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
        
        if (data?.length !== undefined && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                const formattedImageLinks = JSON.parse(data[i].image_links)
                data[i].image_links = formattedImageLinks
            }
        }
        
        res.send(data)
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

const getAllProductsDashboard = (req: Request, res: Response) => {
    Product.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occured while getting posts.'
            })
            console.log('Some error occured while getting all products for the dashboard');

        }
        res.send(data)
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
const postNewProduct = (req: Request, res: Response) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }
    const newProduct = new Product({
        product_name : req.body.product_name,
        price : req.body.price,
        type : req.body.type,
        material : req.body.material,
        color : req.body.color,
        state : req.body.state,
        description : req.body.description,
        in_stock : req.body.in_stock,
        user_id : req.body.user_id,
        // updated_at : req.body.updated_at
    })

    Product.postNewProduct(newProduct, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occured while creating post.'
            })
        } else {
            res.send(data);
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





// // images request
// // get all images from product id
// // return arr with all urls
// const getImages = (productData: Product | null) => {
//     let imageArray: string[] = []
//         console.log('product', productData);
    
// }

exports.getAllProducts = getAllProducts
exports.getProduct = getProduct
exports.getConfirmation = getConfirmation
exports.getAllProductsDashboard = getAllProductsDashboard
exports.postNewProduct = postNewProduct