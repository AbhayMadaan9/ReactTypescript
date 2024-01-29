import express from 'express';
import jwt from 'jsonwebtoken'
import { merge, get } from 'lodash';

import { getUserBySessionToken } from '../db/users'; 

export const isAuthenticated = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    const sessionToken: string | null = req.headers.authtoken;
    console.log(sessionToken)
    if (!sessionToken) {
      return res.sendStatus(403);
    }

    try {
      var decoded: any =  jwt.verify(sessionToken, 'secret');
      merge(req, { identity: decoded.data.id });
      req.userid = decoded.data.id;
    } catch {
      res.sendStatus(400);
    }
    
     

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id') as string;

    if (!currentUserId) {
      return res.sendStatus(400);
    }

    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}