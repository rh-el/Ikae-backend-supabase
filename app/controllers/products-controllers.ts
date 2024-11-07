import { Request, Response } from "express"
import Product from "../models/product.model"
import { get } from "http"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

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
        console.log(data);
        

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
    Product.getConfirmationInfo(req.params.id, (err,data) => {
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

const deleteProduct = (req: Request, res: Response) => {
    Product.deleteProductInfo(req.params.id, (err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || 'Some error occured while deleted product info.'    
            })
        }
        else {
            res.send('Product info deleted.') 
        }
    })
}

const updateProductStock = (req: Request, res: Response) => {
    Product.updateProductStock(req.params.id, (err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || 'Some error occured while updating product info.'    
            })
        }
        else {
            res.send('Product info updated: out of stock.') 
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


const updateProductInfo = (req: Request, res: Response) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }
    const product = new Product({
        product_name : req.body.product_name,
        price : req.body.price,
        type : req.body.type,
        material : req.body.material,
        color : req.body.color,
        state : req.body.state,
        description : req.body.description,
        in_stock : req.body.in_stock,
        user_id : req.body.user_id,
    })

    Product.updateProductInfo(product, req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occured while updating product.'
            })
        } else {
            res.send(data);
        }
    })
}

const getTest = (req: Request, res: Response) => {
    res.send("Vous êtes authentifiée.")
}

const getToken = (req: Request, res: Response) => {
    dotenv.config()
    // vérifier que l'utilisateur existe
    // s'il existe :
    const username = req.body.username;
    const token = jwt.sign( {username: username}, process.env.TOKEN_SECRET as string, { expiresIn: '2 days' })

    res.json(token);

    // else : 
    // res.status(403)
}

exports.getAllProducts = getAllProducts
exports.getProduct = getProduct
exports.deleteProduct = deleteProduct
exports.updateProductStock = updateProductStock
exports.getConfirmation = getConfirmation
exports.getAllProductsDashboard = getAllProductsDashboard
exports.postNewProduct = postNewProduct
exports.updateProductInfo = updateProductInfo
exports.getTest = getTest
exports.getToken = getToken