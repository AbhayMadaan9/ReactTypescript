import express from 'express';

import { login, refreshtoken, register } from '../controllers/authentication';
import { inputvalidation } from '../middlewares';

export default (router: express.Router) => {
  router.post('/auth/register', inputvalidation, register);
  router.post('/auth/login',inputvalidation, login);
  router.post('/auth/refreshtoken', refreshtoken);
};
