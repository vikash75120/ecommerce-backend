import {
  addUser,
  deleteUserById,
  fetchUserByEmail,
  fetchUserById,
  fetchUserWithPass,
  findUsers,
  updateUserField,
} from '../services/user.service';
import { createUserSchema, loginUserSchema } from '../utils/zodValidation';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { toPublicUser } from '../utils/utils';

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await findUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: { message: 'something went wrong while fetching the users' } });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = createUserSchema.safeParse(req.body);
    if (!user.success) {
      res.status(400).json({ error: { message: user.error.issues } });
      return;
    }

    const existing = await fetchUserByEmail(user.data.email);
    if (existing) {
      res.status(409).json({ error: { message: 'Email already registered' } });
      return;
    }

    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const newUserData = {
      ...user.data,
      password_hash: hashedPass,
    };
    const userAdded: User = await addUser(newUserData);
    if (userAdded) {
      res.status(201).json({
        message: 'user created successfully',
        user: toPublicUser(userAdded),
      });
    }
  } catch (err) {
    console.log('error while db: ', err);
    res.status(500).json({ error: { message: 'Something went wrong while creating the user' } });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const user = await fetchUserById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: { message: 'Something went wrong while fetching the user' } });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const user = req.body;
    // if(!user.success){
    //     res.status(400).json({error:{message:user.error.issues}});
    //     return;
    // }

    const updatedUser = await updateUserField(id, user);
    res.status(200).json(updatedUser);
  } catch (err) {
    res
      .status(500)
      .json({ error: { message: 'Something went wrong while fetching the user', err: err } });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const user = await deleteUserById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: { message: 'Something went wrong while deleting the user' } });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = loginUserSchema.safeParse(req.body);
    if (!user.success) {
      res.status(400).json({ error: { message: user.error.issues } });
      return;
    }

    const existing = await fetchUserWithPass(user.data.email);
    if (!existing) {
      res.status(401).json({ error: { message: 'Invalid email or password' } });
      return;
    }

    const match = await bcrypt.compare(req.body.password, existing.password_hash);

    if (match) {
      const accessToken = jwt.sign(
        { userId: existing.id, role: existing.role },
        process.env.TOKEN_SECRET!,
        {
          expiresIn: '1h',
        }
      );
      res.status(200).json({
        message: 'user login',
        accessToken: accessToken,
      });
    } else {
      res.status(401).json({ error: { message: 'Invalid email or password' } });
    }
  } catch (err) {
    res.status(500).json({ error: { message: 'Something went wrong while logging in the user' } });
  }
};
