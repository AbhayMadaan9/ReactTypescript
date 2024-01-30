import express from 'express';

import { getAllUsers, deleteUser, updateUser, getUser } from '../controllers/users';
import { isAuthenticated, isOwner, isUser } from '../middlewares';

export default (router: express.Router) => {
  router.get('/user', isAuthenticated, getUser);
  router.get('/users', isAuthenticated, isOwner, getAllUsers);
  router.delete('/deleteuser/:id', isAuthenticated, isOwner, deleteUser);
  router.patch('/users/:id', isAuthenticated,isOwner, updateUser);
};
