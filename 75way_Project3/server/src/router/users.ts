import express from 'express';

import { getAllUsers, deleteUser, updateUser, getUser } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
  router.get('/user', isAuthenticated, getUser);
  router.get('/users', isAuthenticated, getAllUsers);
  router.delete('/deleteuser/:id', isAuthenticated, deleteUser);
  router.patch('/users/:id', isAuthenticated, updateUser);
};
