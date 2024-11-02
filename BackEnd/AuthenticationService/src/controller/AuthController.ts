// src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/AuthModel';
import axios, { AxiosError } from 'axios';

export const register = async (req: Request, res: Response) => {
    try {
      const { password, ...userData } = req.body;
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Construct the new user object with hashed password
      const newUser = { ...userData, password: hashedPassword };
  
      // Send the new user data as a POST request to the specified URL
      const response = await axios.post('http://localhost:4001/api/v1/users', newUser);
  
      // Check if the request was successful
      if (response.status === 201) {
        res.status(201).json({ message: 'User registered successfully' });
      } 
      else if(response.status===400) {
        res.status(response.status).json({ message: 'User Already Exist' });
      }
      else {
        res.status(response.status).json({ message: 'Error registering user'});
      }
    } catch (error) {
      if(error instanceof AxiosError && error.response && error.response.status===400) {
        res.status(error.response.status).json({ message: 'User Already Exist' });
      }
      else{
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user' });
      }
    }
  };
  
export const login = async (req: Request, res: Response) => {
  try {
    const { user_id, password, ...otherData} = req.body;
    // Fetch user data by user_id
    const response = await axios.get(`http://localhost:4001/api/v1/users/${user_id}`);
      const user = response.data;
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: 'Invalid user ID or password' });
      } else {
        // Generate JWT token
        const token = jwt.sign(
          { id: user.user_id ,role:user.role},
          "qwertyuiopasdfghjklzxcvbnm" as string,
          { expiresIn: '1h' }
        );

        // Respond with the token
        res.status(200).json({ token });
      }
  } catch (error) {
    if (error instanceof AxiosError && error.response && error.response.status === 404) {
      res.status(404).json({ message: 'User not found' });
    }
    else{
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Error logging in' });
    }
    
  }
};

