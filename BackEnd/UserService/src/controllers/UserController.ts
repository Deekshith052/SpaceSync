// src/controllers/userController.ts
import { Request, Response } from 'express';
import { User } from '../models/UserModel';

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create user', error });
  }
};

// Get all users
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({user_id:req.params.id});
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findOneAndUpdate({user_id:req.params.id}, req.body, {
      new: true,
      runValidators: true,
    });
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Failed to update user', error });
  }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findOneAndDelete({user_id:req.params.id});
    if (deletedUser) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error });
  }
};
