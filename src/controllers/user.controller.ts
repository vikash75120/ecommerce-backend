import { addUser, deleteUserById, fetchUserById, findUsers, updateUserField } from "../services/user.service";
import { createUserSchema } from "../utils/zodValidation.js";
import { Request, Response } from "express";

type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
}

export const getAllUsers = async (req: Request, res: Response) => {
    try{
        const users = await findUsers();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json({error: {message: "something went wrong while fetching the users"}})
    }
}

export const createUser = async(req: Request, res: Response)=>{
    try{
        const user = createUserSchema.safeParse(req.body);
        if(!user.success){
            res.status(400).json({error:{message:user.error.issues}});
            return;
        }
        const userAdded: User = await addUser(user.data);
        if(userAdded){
            res.status(200).json({
                message: "user created successfully",
                user: userAdded
            })
        }
    }catch(err){
        console.log("error while db: ", err);
        res.status(500).json({error:{message:"Something went wrong while creating the user"}});
    }
}

export const getUserById = async(req: Request, res: Response)=>{
    try{
        const id = Number(req.params.id);
        const user = await fetchUserById(id);
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({error:{message:"Something went wrong while fetching the user"}});
    }
}

export const updateUser = async(req: Request, res: Response)=>{
    try{
        const id = Number(req.params.id);
        const user = req.body;
        // if(!user.success){
        //     res.status(400).json({error:{message:user.error.issues}});
        //     return;
        // }

        const updatedUser = await updateUserField(id, user);
        res.status(200).json(updatedUser);
    }catch(err){
        res.status(500).json({error:{message:"Something went wrong while fetching the user", err: err}});
    }
}

export const deleteUser = async(req: Request, res: Response)=>{
    try{
        const id = Number(req.params.id);
        const user = await deleteUserById(id);
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({error:{message:"Something went wrong while deleting the user"}});
    }
}
