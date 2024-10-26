
import express from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/UserController';

const Router = express.Router();

Router.post('/users', createUser);          // Create
Router.get('/users', getUsers);             // Read all users
Router.get('/users/:id', getUserById);      // Read a single user by ID
Router.put('/users/:id', updateUser);       // Update
Router.delete('/users/:id', deleteUser);    // Delete

export default Router;
