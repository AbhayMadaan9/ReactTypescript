import express from 'express';

import { getAllUsers, deleteUser, updateUser, getUser } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
  router.get('/user/:id', isAuthenticated, getUser);
  router.get('/users', isAuthenticated, getAllUsers);
  router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
  router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
};
