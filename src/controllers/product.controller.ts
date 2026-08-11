import { addProduct, deleteProductById, fetchProductById, findProduct, updateProductField } from "../services/product.service";
import { Request, Response } from "express";

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    stock_qty: number;
    brand: string;
    status: string;
}

export const getAllProducts = async (req: Request, res: Response) => {
    try{
        const products = await findProduct();
        res.status(200).json(products);
    }catch(err){
        res.status(500).json({error: {message: "something went wrong while fetching the products"}})
    }
}

export const createProduct = async(req: Request, res: Response)=>{
    try{
        // const user = createUserSchema.safeParse(req.body);
        // if(!user.success){
        //     res.status(400).json({error:{message:user.error.issues}});
        //     return;
        // }
        const productAdded: Product = await addProduct(req.body);
        if(productAdded){
            res.status(200).json({
                message: "product created successfully",
                user: productAdded
            })
        }
    }catch(err){
        console.log("error while db: ", err);
        res.status(500).json({error:{message:"Something went wrong while creating the product"}});
    }
}

export const getProductById = async(req: Request, res: Response)=>{
    try{
        const id = Number(req.params.id);
        const product = await fetchProductById(id);
        res.status(200).json(product);
    }catch(err){
        res.status(500).json({error:{message:"Something went wrong while fetching the product"}});
    }
}

export const updateProduct = async(req: Request, res: Response)=>{
    try{
        const id = Number(req.params.id);
        const product = req.body;
        // if(!user.success){
        //     res.status(400).json({error:{message:user.error.issues}});
        //     return;
        // }

        const updatedProduct = await updateProductField(id, product);
        res.status(200).json(updatedProduct);
    }catch(err){
        res.status(500).json({error:{message:"Something went wrong while fetching the product", err: err}});
    }
}

export const deleteProduct = async(req: Request, res: Response)=>{
    try{
        const id = Number(req.params.id);
        const product = await deleteProductById(id);
        res.status(200).json(product);
    }catch(err){
        res.status(500).json({error:{message:"Something went wrong while deleting the product"}});
    }
}
